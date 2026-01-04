const admin = require('firebase-admin');
const fs = require('fs');

// 開発環境の初期化
const devApp = admin.initializeApp({
  projectId: 'base-asset-sharing-system'
}, 'dev');

// 本番環境の初期化
const prodApp = admin.initializeApp({
  projectId: 'asset-sharing-production'
}, 'prod');

async function copyBases() {
  console.log('📤 開発環境からデータを取得中...');
  
  const devDb = devApp.firestore();
  const snapshot = await devDb.collection('baseMaster').get();
  
  console.log(`✅ ${snapshot.size}件の拠点データを取得しました`);
  
  const prodDb = prodApp.firestore();
  const batch = prodDb.batch();
  
  snapshot.forEach(doc => {
    const ref = prodDb.collection('baseMaster').doc(doc.id);
    batch.set(ref, doc.data());
  });
  
  console.log('📥 本番環境にデータをコピー中...');
  await batch.commit();
  
  console.log('✅ 完了！本番環境に拠点データをコピーしました');
  process.exit(0);
}

copyBases().catch(error => {
  console.error('❌ エラー:', error);
  process.exit(1);
});
