let assetId = '';
let assetData = null;

document.addEventListener('DOMContentLoaded', async () => {
  // URLからassetIdを取得
  const urlParams = new URLSearchParams(window.location.search);
  assetId = urlParams.get('id');

  if (!assetId) {
    alert('資産IDが指定されていません');
    history.back();
    return;
  }

  // 資産情報を読み込み
  await loadAssetInfo();

  // 拠点一覧を読み込み
  await loadBases();

  // フォーム送信
  document.getElementById('transferForm').addEventListener('submit', handleSubmit);
});

// 資産情報読み込み
async function loadAssetInfo() {
  try {
    const doc = await firebase.firestore().collection('assets').doc(assetId).get();
    
    if (!doc.exists) {
      alert('資産が見つかりません');
      history.back();
      return;
    }

    assetData = doc.data();
    
    const detailsDiv = document.getElementById('assetDetails');
    detailsDiv.innerHTML = `
      <p><strong>資産名:</strong> ${assetData.assetName}</p>
      <p><strong>大分類:</strong> ${assetData.largeCategory}</p>
      <p><strong>中分類:</strong> ${assetData.mediumCategory}</p>
      <p><strong>現在の拠点:</strong> ${assetData.baseName || '未設定'}</p>
      ${assetData.images && assetData.images[0] ? 
        `<img src="${assetData.images[0]}" style="max-width: 200px; border-radius: 8px; margin-top: 10px;">` : ''}
    `;
  } catch (error) {
    console.error('資産情報読み込みエラー:', error);
    alert('資産情報の読み込みに失敗しました');
  }
}

// 拠点一覧読み込み
async function loadBases() {
  try {
    const snapshot = await firebase.firestore().collection('baseMaster').get();
    const select = document.getElementById('toBaseId');
    
    snapshot.forEach(doc => {
      const base = doc.data();
      // 現在の拠点以外を表示
      if (doc.id !== assetData.baseId) {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = base.baseName;
        select.appendChild(option);
      }
    });
  } catch (error) {
    console.error('拠点一覧読み込みエラー:', error);
    alert('拠点一覧の読み込みに失敗しました');
  }
}

// 譲渡申請送信
async function handleSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = '申請中...';

  try {
    const toBaseId = document.getElementById('toBaseId').value;
    const toBaseSnapshot = await firebase.firestore().collection('baseMaster').doc(toBaseId).get();
    const toBaseName = toBaseSnapshot.data().baseName;

    // 譲渡申請データ作成
    const transferData = {
      assetId: assetId,
      assetName: assetData.assetName,
      fromUserId: firebase.auth().currentUser.uid,
      fromUserEmail: firebase.auth().currentUser.email,
      fromBaseId: assetData.baseId,
      fromBaseName: assetData.baseName,
      toBaseId: toBaseId,
      toBaseName: toBaseName,
      reason: document.getElementById('reason').value,
      deliveryMethod: document.getElementById('deliveryMethod').value,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Firestore保存
    await firebase.firestore().collection('transferRequests').add(transferData);

    alert('譲渡申請を送信しました！');

    // メール下書き作成
    const subject = encodeURIComponent(`【譲渡申請】${assetData.assetName}の譲渡申請`);
    const body = encodeURIComponent(`譲渡申請が送信されました。\n\n■ 資産情報\n資産名: ${assetData.assetName}\n申請者: ${firebase.auth().currentUser.email}\n譲渡元: ${assetData.baseName}\n譲渡先: ${toBaseName}\n理由: ${document.getElementById("reason").value}\n受取方法: ${document.getElementById("deliveryMethod").value}\n\n承認をお願いします。`);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      window.location.href = "/my-items.html";
    }, 1000);

  } catch (error) {
    console.error('譲渡申請エラー:', error);
    alert('譲渡申請に失敗しました: ' + error.message);
    submitBtn.disabled = false;
    submitBtn.textContent = '譲渡申請する';
  }
}
