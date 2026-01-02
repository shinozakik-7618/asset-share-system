// 通知を作成
async function createNotification(userId, type, data) {
  try {
    await firebase.firestore()
      .collection('notifications')
      .add({
        userId: userId,
        type: type,
        assetId: data.assetId || '',
        assetName: data.assetName || '',
        fromUserName: data.fromUserName || '',
        message: data.message || '',
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    
    console.log('通知作成成功:', type);
  } catch (error) {
    console.error('通知作成エラー:', error);
  }
}

// 未読通知数を取得
async function getUnreadCount(userId) {
  try {
    const snapshot = await firebase.firestore()
      .collection('notifications')
      .where('userId', '==', userId)
      .where('read', '==', false)
      .get();
    
    return snapshot.size;
  } catch (error) {
    console.error('未読数取得エラー:', error);
    return 0;
  }
}

// 通知一覧を取得
async function getNotifications(userId, limit = 20) {
  try {
    const snapshot = await firebase.firestore()
      .collection('notifications')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
    
    const notifications = [];
    snapshot.forEach(doc => {
      notifications.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return notifications;
  } catch (error) {
    console.error('通知取得エラー:', error);
    return [];
  }
}

// 通知を既読にする
async function markAsRead(notificationId) {
  try {
    await firebase.firestore()
      .collection('notifications')
      .doc(notificationId)
      .update({
        read: true
      });
  } catch (error) {
    console.error('既読更新エラー:', error);
  }
}

// 全通知を既読にする
async function markAllAsRead(userId) {
  try {
    const snapshot = await firebase.firestore()
      .collection('notifications')
      .where('userId', '==', userId)
      .where('read', '==', false)
      .get();
    
    const batch = firebase.firestore().batch();
    snapshot.forEach(doc => {
      batch.update(doc.ref, { read: true });
    });
    
    await batch.commit();
    console.log('全通知を既読にしました');
  } catch (error) {
    console.error('一括既読エラー:', error);
  }
}

// 通知アイコンの未読バッジを更新
async function updateNotificationBadge() {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) return;
  
  const unreadCount = await getUnreadCount(currentUser.uid);
  const badge = document.getElementById('notificationBadge');
  
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}
