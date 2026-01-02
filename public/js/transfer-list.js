firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    loadMyRequests();
  } else {
    window.location.href = '/index.html';
  }
});

// 自分の譲渡申請を読み込む
async function loadMyRequests() {
  const loading = document.getElementById('loading');
  const requestList = document.getElementById('requestList');
  
  try {
    const snapshot = await firebase.firestore()
      .collection('transferRequests')
      .where('fromUserId', '==', firebase.auth().currentUser.uid)
      .get();
    
    loading.style.display = 'none';
    
    if (snapshot.empty) {
      requestList.innerHTML = '<p style="text-align: center; color: #666;">譲渡申請はありません</p>';
      return;
    }
    
    let html = '';
    snapshot.forEach(doc => {
      const req = doc.data();
      const statusText = req.status === 'pending' ? '承認待ち' : 
                         req.status === 'approved' ? '承認済み' : 
                         req.status === 'rejected' ? '却下' : 
                         req.status === 'completed' ? '完了' : 
                         req.status === 'cancelled' ? '取り消し済み' : req.status;
      
      const statusColor = req.status === 'pending' ? '#ff9800' : 
                          req.status === 'approved' ? '#4caf50' : 
                          req.status === 'rejected' ? '#f44336' : 
                          req.status === 'completed' ? '#2196f3' : 
                          req.status === 'cancelled' ? '#9e9e9e' : '#666';
      
      html += `
        <div class="card" style="margin-bottom: 20px;">
          <h3>${req.assetName}</h3>
          <p><strong>ステータス:</strong> <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></p>
          <p><strong>譲渡元:</strong> ${req.fromBaseName}</p>
          <p><strong>譲渡先:</strong> ${req.toBaseName}</p>
          <p><strong>理由:</strong> ${req.reason}</p>
          <p><strong>申請日:</strong> ${req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleDateString('ja-JP') : '-'}</p>
          
          ${req.status === 'pending' ? `
            <button onclick="cancelRequest('${doc.id}', '${req.assetName}')" class="btn" style="width: 100%; background: #f44336; color: white; margin-top: 10px;">申請を取り消す</button>
          ` : ''}
        </div>
      `;
    });
    
    requestList.innerHTML = html;
    
  } catch (error) {
    console.error('読み込みエラー:', error);
    loading.innerHTML = '<p style="color: red;">エラーが発生しました</p>';
  }
}

// 申請を取り消す
async function cancelRequest(requestId, assetName) {
  const reason = prompt(`${assetName}の譲渡申請を取り消しますか？\n\n取り消し理由を入力してください:`);
  
  if (!reason) {
    return;
  }
  
  try {
    await firebase.firestore().collection('transferRequests').doc(requestId).update({
      status: 'cancelled',
      cancelledAt: firebase.firestore.FieldValue.serverTimestamp(),
      cancelledBy: firebase.auth().currentUser.uid,
      cancelReason: reason
    });
    
    alert('譲渡申請を取り消しました');
    loadMyRequests();
    
  } catch (error) {
    console.error('取り消しエラー:', error);
    alert('取り消しに失敗しました: ' + error.message);
  }
}
