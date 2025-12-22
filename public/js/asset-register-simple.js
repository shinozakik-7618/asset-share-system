// 中分類マスタ
const mediumCategories = {
  'PC・IT機器': ['ノートPC', 'デスクトップPC', 'TV', 'モニター', 'タブレット', 'その他'],
  '机': ['2人用', '4人用', '6人用', '折りたたみ', '丸テーブル', 'その他'],
  '椅子': ['ダイニングチェア', 'アームチェア', 'カウンターチェア', 'スタッキングチェア', 'フォールディングチェア', 'リクライニングチェア', 'ゲーミングチェア', 'ソファ', 'その他'],
  '事務用品・備品': ['ロッカー', 'キャビネット', 'ホワイトボード', 'パーテーション', 'その他'],
  '什器等': ['本棚', '媒体スタンド', '棚板', 'フック', 'その他'],
  '媒体': ['journal', 'members', '安全のしおり', 'カタログ', '統合報告書', 'その他'],
  'デポ備品': ['デポ袋', 'モチーナ', 'セキュリティ関連', 'その他'],
  'その他': ['その他']
};

let capturedImage = null;

// 大分類変更
function updateMediumCategory() {
  const largeCategory = document.getElementById('largeCategory').value;
  const mediumSelect = document.getElementById('mediumCategory');
  mediumSelect.innerHTML = '<option value="">選択してください</option>';
  
  if (largeCategory && mediumCategories[largeCategory]) {
    mediumCategories[largeCategory].forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      mediumSelect.appendChild(option);
    });
    mediumSelect.disabled = false;
  } else {
    mediumSelect.disabled = true;
  }
}

// 写真を撮る
function capturePhoto() {
  document.getElementById('photoCapture').click();
}

// 写真プレビュー
function previewPhoto(event) {
  const file = event.target.files[0];
  if (file) {
    capturedImage = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('photoPreview').innerHTML = `
        <img src="${e.target.result}" style="width: 200px; height: 200px; object-fit: cover; border-radius: 8px;">
        <p style="color: green; margin-top: 0.5rem;">✅ 写真が選択されました</p>
      `;
    };
    reader.readAsDataURL(file);
  }
}

// フォーム送信
async function submitForm(e) {
  e.preventDefault();
  
  if (!capturedImage) {
    alert('写真を撮影してください');
    return;
  }
  
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = '登録中...';
  
  try {
    // 画像アップロード
    const timestamp = Date.now();
    const fileName = `${timestamp}_${capturedImage.name}`;
    const storageRef = firebase.storage().ref(`items/${currentUser.uid}/${fileName}`);
    const snapshot = await storageRef.put(capturedImage);
    const imageUrl = await snapshot.ref.getDownloadURL();
    
    // Firestoreに登録
    const assetData = {
      assetName: document.getElementById('assetName').value,
      largeCategoryName: document.getElementById('largeCategory').value,
      mediumCategoryName: document.getElementById('mediumCategory').value,
      width: document.getElementById('width').value || null,
      depth: document.getElementById('depth').value || null,
      height: document.getElementById('height').value || null,
      memo: document.getElementById('memo').value,
      images: [imageUrl],
      userId: currentUser.uid,
      userEmail: currentUser.email,
      status: 'available',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    await firebase.firestore().collection('assets').add(assetData);
    
    alert('登録しました');
    window.location.href = '/home.html';
    
  } catch (error) {
    console.error('登録エラー:', error);
    alert('エラーが発生しました');
    btn.disabled = false;
    btn.textContent = '✅ 登録する';
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('largeCategory').addEventListener('change', updateMediumCategory);
  document.getElementById('photoCapture').addEventListener('change', previewPhoto);
  document.getElementById('registerForm').addEventListener('submit', submitForm);
});
