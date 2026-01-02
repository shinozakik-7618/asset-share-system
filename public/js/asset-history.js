// 資産履歴を記録
async function recordAssetHistory(assetId, action, details = {}) {
  try {
    const currentUser = firebase.auth().currentUser;
    const userDoc = await firebase.firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get();
    
    const userData = userDoc.data();
    
    await firebase.firestore()
      .collection('assetHistory')
      .add({
        assetId: assetId,
        action: action,
        userId: currentUser.uid,
        userName: userData.name || 'Unknown User',
        userBase: userData.baseName || '',
        details: details,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    
    console.log('履歴記録成功:', action);
  } catch (error) {
    console.error('履歴記録エラー:', error);
  }
}

// 資産履歴を取得
async function getAssetHistory(assetId) {
  try {
    const snapshot = await firebase.firestore()
      .collection('assetHistory')
      .where('assetId', '==', assetId)
      .orderBy('timestamp', 'desc')
      .get();
    
    const history = [];
    snapshot.forEach(doc => {
      history.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return history;
  } catch (error) {
    console.error('履歴取得エラー:', error);
    return [];
  }
}

// 履歴をHTML表示
function renderHistoryTimeline(history) {
  if (!history || history.length === 0) {
    return '<p style="text-align: center; color: #999; padding: 20px;">履歴がありません</p>';
  }
  
  const actionIcons = {
    'created': '✨',
    'edited': '✏️',
    'transferred': '🔄',
    'status_changed': '🔄',
    'deleted': '🗑️'
  };
  
  const actionTexts = {
    'created': '登録',
    'edited': '編集',
    'transferred': '譲渡',
    'status_changed': 'ステータス変更',
    'deleted': '削除'
  };
  
  return history.map(item => {
    const date = item.timestamp ? new Date(item.timestamp.toDate()).toLocaleString('ja-JP') : '不明';
    const icon = actionIcons[item.action] || '📝';
    const actionText = actionTexts[item.action] || item.action;
    
    let detailsHtml = '';
    if (item.details && Object.keys(item.details).length > 0) {
      detailsHtml = '<div style="margin-top: 8px; font-size: 13px; color: #666;">';
      for (const [key, value] of Object.entries(item.details)) {
        detailsHtml += `<div>• ${key}: ${value}</div>`;
      }
      detailsHtml += '</div>';
    }
    
    return `
      <div style="display: flex; gap: 15px; padding: 15px; background: white; border-left: 3px solid #1976d2; margin-bottom: 10px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <div style="font-size: 24px;">${icon}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #333; margin-bottom: 5px;">${actionText}</div>
          <div style="font-size: 13px; color: #666;">
            ${item.userName}${item.userBase ? ` (${item.userBase})` : ''}
          </div>
          <div style="font-size: 12px; color: #999; margin-top: 5px;">${date}</div>
          ${detailsHtml}
        </div>
      </div>
    `;
  }).join('');
}
