let assetId = '';
let assetData = null;
let allBases = [];

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

  // ブロック選択時
  document.getElementById('block').addEventListener('change', handleBlockChange);
  
  // 地域選択時
  document.getElementById('region').addEventListener('change', handleRegionChange);

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
    
    snapshot.forEach(doc => {
      const base = doc.data();
      allBases.push({
        id: doc.id,
        baseName: base.baseName,
        region: base.region || '',
        block: base.block || ''
      });
    });
    
    // ブロック一覧を作成
    const blocks = [...new Set(allBases.map(b => b.block).filter(b => b))];
    const blockSelect = document.getElementById('block');
    
    blocks.forEach(block => {
      const option = document.createElement('option');
      option.value = block;
      option.textContent = block;
      blockSelect.appendChild(option);
    });
    
  } catch (error) {
    console.error('拠点一覧読み込みエラー:', error);
    alert('拠点一覧の読み込みに失敗しました');
  }
}

// ブロック選択時
function handleBlockChange() {
  const block = document.getElementById('block').value;
  const regionSelect = document.getElementById('region');
  const baseSelect = document.getElementById('toBaseId');
  
  // リセット
  regionSelect.innerHTML = '<option value="">地域を選択してください</option>';
  baseSelect.innerHTML = '<option value="">拠点を選択してください</option>';
  baseSelect.disabled = true;
  
  if (!block) {
    regionSelect.disabled = true;
    return;
  }
  
  // 地域一覧を作成
  const regions = [...new Set(allBases.filter(b => b.block === block).map(b => b.region).filter(r => r))];
  
  regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });
  
  regionSelect.disabled = false;
}

// 地域選択時
function handleRegionChange() {
  const block = document.getElementById('block').value;
  const region = document.getElementById('region').value;
  const baseSelect = document.getElementById('toBaseId');
  
  // リセット
  baseSelect.innerHTML = '<option value="">拠点を選択してください</option>';
  
  if (!region) {
    baseSelect.disabled = true;
    return;
  }
  
  // 拠点一覧を作成（現在の拠点以外）
  const bases = allBases.filter(b => b.block === block && b.region === region && b.id !== assetData.baseId);
  
  bases.forEach(base => {
    const option = document.createElement('option');
    option.value = base.id;
    option.textContent = base.baseName;
    option.dataset.baseName = base.baseName;
    baseSelect.appendChild(option);
  });
  
  baseSelect.disabled = false;
}

// 譲渡申請送信
async function handleSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = '申請中...';

  try {
    const toBaseId = document.getElementById('toBaseId').value;
    const toBaseSelect = document.getElementById('toBaseId');
    const toBaseName = toBaseSelect.options[toBaseSelect.selectedIndex].dataset.baseName;

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
