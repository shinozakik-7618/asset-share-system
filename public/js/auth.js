// 認証関連の処理

let currentUser = null;

// ログイン状態の監視
auth.onAuthStateChanged((user) => {
  currentUser = user;
  
  if (user) {
    console.log('ログイン成功:', user.email);
    
    // ログインページから来た場合はホームへリダイレクト
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
      window.location.href = '/home.html';
      return;
    }
    
    // Firestore保存は非同期で実行（リダイレクトをブロックしない）
    db.collection('users').doc(user.uid).set({
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(err => console.error('保存エラー:', err));
    
  } else {
    console.log('未ログイン');
    // ログインページ以外でログインしていない場合はログインページへ
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
      window.location.href = '/index.html';
    }
  }
});

// Googleログイン
async function signInWithGoogle() {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (error) {
    console.error('ログインエラー:', error);
    alert('ログインに失敗しました: ' + error.message);
  }
}

// ログアウト
async function signOut() {
  try {
    await auth.signOut();
    console.log('ログアウト成功');
    window.location.href = '/index.html';
  } catch (error) {
    console.error('ログアウトエラー:', error);
    alert('ログアウトに失敗しました');
  }
}
