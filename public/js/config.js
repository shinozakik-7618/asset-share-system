// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyBK-3xf-GxsWED1MmTKFhQZoqfxSM-EKls",
  authDomain: "base-asset-sharing-system.firebaseapp.com",
  projectId: "base-asset-sharing-system",
  storageBucket: "base-asset-sharing-system.firebasestorage.app",
  messagingSenderId: "755120116234",
  appId: "1:755120116234:web:f95dd55ca6637cadfd45f3"
};

// Firebase 初期化
firebase.initializeApp(firebaseConfig);

// Firebase サービス
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Google 認証プロバイダー
const googleProvider = new firebase.auth.GoogleAuthProvider();

// 日本ロケーション設定
firebase.firestore().settings({
  ignoreUndefinedProperties: true
});
