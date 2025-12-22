// ホーム画面のJavaScript

let allItems = [];
let filteredItems = [];
let currentFilter = 'all';
let currentSort = 'newest';

// ページ読み込み時
document.addEventListener('DOMContentLoaded', async () => {
  // ユーザー情報表示
  await displayUserInfo();
  
  // 検索イベント
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  
  // フィルターイベント
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', handleFilter);
  });
  
  // ソートイベント
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', handleSort);
  });
  
  // アイテム一覧を取得
  await loadItems();
});

// ユーザー情報表示
async function displayUserInfo() {
  const userData = await getCurrentUserData();
  if (userData) {
    const userInfo = document.getElementById('userInfo');
    userInfo.innerHTML = `
      <div class="header-user-name">${userData.displayName}</div>
      <div class="header-user-base">${userData.baseName || '拠点未設定'}</div>
    `;
  }
}

// アイテム一覧を取得
async function loadItems() {
  const loading = document.getElementById('loading');
  const itemList = document.getElementById('itemList');
  const emptyState = document.getElementById('emptyState');
  
  loading.style.display = 'block';
  itemList.style.display = 'none';
  emptyState.style.display = 'none';
  
  try {
    const snapshot = await db.collection('assets')
      .orderBy('createdAt', 'desc')
      .get();
    
    allItems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    filteredItems = [...allItems];
    renderItems();
    
  } catch (error) {
    console.error('データ取得エラー:', error);
    loading.style.display = 'none';
    emptyState.style.display = 'block';
    document.querySelector('.empty-message').textContent = 'データの取得に失敗しました';
  }
}

// 検索処理
function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  filteredItems = allItems.filter(item => 
    item.itemName.toLowerCase().includes(query) ||
    item.largeCategory.toLowerCase().includes(query) ||
    item.mediumCategory.toLowerCase().includes(query)
  );
  renderItems();
}

// フィルター処理
function handleFilter(e) {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.remove('active');
  });
  e.target.classList.add('active');
  
  currentFilter = e.target.dataset.filter;
  
  if (currentFilter === 'all') {
    filteredItems = [...allItems];
  } else {
    filteredItems = allItems.filter(item => item.largeCategory === currentFilter);
  }
  
  renderItems();
}

// ソート処理
function handleSort(e) {
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  e.target.classList.add('active');
  
  currentSort = e.target.dataset.sort;
  
  if (currentSort === 'newest') {
    filteredItems.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  } else if (currentSort === 'oldest') {
    filteredItems.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
  } else if (currentSort === 'name') {
    filteredItems.sort((a, b) => a.itemName.localeCompare(b.itemName, 'ja'));
  }
  
  renderItems();
}

// アイテムを表示
function renderItems() {
  const loading = document.getElementById('loading');
  const itemList = document.getElementById('itemList');
  const emptyState = document.getElementById('emptyState');
  
  loading.style.display = 'none';
  
  if (filteredItems.length === 0) {
    itemList.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    itemList.style.display = 'grid';
    emptyState.style.display = 'none';
    
    itemList.innerHTML = filteredItems.map(item => `
      <div class="item-card" onclick="viewItemDetail('${item.id}')">
        <div class="item-image">
          ${item.images && item.images.length > 0 
            ? `<img src="${item.images[0]}" alt="${item.itemName}">` 
            : '<div class="no-image">📦</div>'}
        </div>
        <div class="item-info">
          <div class="item-category">${item.largeCategory} / ${item.mediumCategory}</div>
          <div class="item-name">${item.itemName}</div>
          <div class="item-quantity">数量: ${item.quantity}</div>
          <div class="item-owner">登録: ${item.ownerName} (${item.ownerBaseName})</div>
          <div class="item-date">${formatDate(item.createdAt)}</div>
        </div>
      </div>
    `).join('');
  }
}

// アイテム詳細表示
function viewItemDetail(itemId) {
  window.location.href = `/asset-detail.html?id=${itemId}`;
}
