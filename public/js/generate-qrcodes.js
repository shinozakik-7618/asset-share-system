// 既存資産にQRコードを一括生成
async function generateQRCodesForExistingAssets() {
  const snapshot = await firebase.firestore().collection('assets').get();
  
  let updated = 0;
  let skipped = 0;
  
  for (const doc of snapshot.docs) {
    const asset = doc.data();
    
    // qrCodeTextが既に存在する場合はスキップ
    if (asset.qrCodeText) {
      skipped++;
      continue;
    }
    
    // QRコード用URLを生成
    const qrCodeText = `https://base-asset-sharing-system.web.app/asset-detail.html?id=${doc.id}`;
    
    // Firestoreを更新
    await firebase.firestore().collection('assets').doc(doc.id).update({
      qrCodeText: qrCodeText
    });
    
    updated++;
    console.log(`✅ 更新: ${asset.assetName || doc.id}`);
  }
  
  console.log(`\n完了！ 更新: ${updated}件、スキップ: ${skipped}件`);
  alert(`QRコード生成完了！\n更新: ${updated}件\nスキップ: ${skipped}件`);
}

// 実行ボタンを追加
document.addEventListener('DOMContentLoaded', () => {
  const button = document.createElement('button');
  button.textContent = '🔧 既存資産にQRコード生成';
  button.style.cssText = 'position: fixed; bottom: 20px; right: 20px; padding: 15px 20px; background: #ff5722; color: white; border: none; border-radius: 8px; cursor: pointer; z-index: 10000; font-weight: bold;';
  button.onclick = () => {
    if (confirm('全ての既存資産にQRコードを生成しますか？')) {
      generateQRCodesForExistingAssets();
    }
  };
  document.body.appendChild(button);
});
