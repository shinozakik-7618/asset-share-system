// QRコード表示ページのJavaScript

let assetData = null;
let assetId = null;

// ページ読み込み時
document.addEventListener('DOMContentLoaded', async () => {
  // URLパラメータからアセットIDを取得
  const urlParams = new URLSearchParams(window.location.search);
  assetId = urlParams.get('id');
  
  if (!assetId) {
    alert('資産IDが指定されていません');
    window.location.href = '/home.html';
    return;
  }
  
  await loadAssetData();
  generateQRCodeDisplay();
});

// 資産データを読み込み
async function loadAssetData() {
  try {
    const doc = await db.collection('assets').doc(assetId).get();
    
    if (!doc.exists) {
      throw new Error('資産が見つかりません');
    }
    
    assetData = { id: doc.id, ...doc.data() };
    displayAssetInfo();
    
  } catch (error) {
    console.error('データ取得エラー:', error);
    alert('資産情報の取得に失敗しました');
    window.location.href = '/home.html';
  }
}

// 資産情報を表示
function displayAssetInfo() {
  document.getElementById('assetName').textContent = assetData.itemName;
  document.getElementById('assetCategory').textContent = 
    `${assetData.largeCategory} / ${assetData.mediumCategory}`;
  document.getElementById('assetQuantity').textContent = `数量: ${assetData.quantity}`;
}

// QRコード表示
function generateQRCodeDisplay() {
  const qrUrl = `https://base-asset-sharing-system.web.app/asset-detail.html?id=${assetId}`;
  const qrCodeImg = generateQRCode(qrUrl, 300);
  
  document.getElementById('qrCodeImage').src = qrCodeImg;
  document.getElementById('assetUrl').textContent = qrUrl;
}

// QRコードを印刷
function printQRCode() {
  window.print();
}

// ホームへ戻る
function goToHome() {
  window.location.href = '/home.html';
}
