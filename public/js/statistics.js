// 統計情報を読み込む
async function loadStatistics() {
  try {
    const currentUser = firebase.auth().currentUser;
    
    // 総資産数
    const allAssetsSnapshot = await firebase.firestore()
      .collection('assets')
      .where('status', '==', 'available')
      .get();
    document.getElementById('totalAssets').textContent = allAssetsSnapshot.size;
    
    // 登録資産数
    const myAssetsSnapshot = await firebase.firestore()
      .collection('assets')
      .where('userId', '==', currentUser.uid)
      .get();
    document.getElementById('myAssets').textContent = myAssetsSnapshot.size;
    
    // 承認待ち申請数
    const pendingSnapshot = await firebase.firestore()
      .collection('transferRequests')
      .where('fromUserId', '==', currentUser.uid)
      .where('status', '==', 'pending')
      .get();
    document.getElementById('pendingRequests').textContent = pendingSnapshot.size;
    
    // カテゴリ数
    const categories = new Set();
    allAssetsSnapshot.forEach(doc => {
      const asset = doc.data();
      if (asset.largeCategory) {
        categories.add(asset.largeCategory);
      }
      if (asset.largeCategoryName) {
        categories.add(asset.largeCategoryName);
      }
    });
    document.getElementById('categoryCount').textContent = categories.size;
    
  } catch (error) {
    console.error('統計情報読み込みエラー:', error);
  }
}

// 詳細統計グラフを描画
async function loadDetailedStats() {
  try {
    const currentUser = firebase.auth().currentUser;
    
    // 全資産を取得
    const snapshot = await firebase.firestore()
      .collection('assets')
      .where('status', '==', 'available')
      .get();
    
    const assets = [];
    snapshot.forEach(doc => {
      assets.push(doc.data());
    });
    
    // カテゴリ別集計
    const categoryData = {};
    assets.forEach(asset => {
      const category = asset.largeCategoryName || asset.largeCategory || 'その他';
      categoryData[category] = (categoryData[category] || 0) + 1;
    });
    
    // 月別集計（過去6ヶ月）
    const monthlyData = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}/${date.getMonth() + 1}`;
      monthlyData[key] = 0;
    }
    
    assets.forEach(asset => {
      if (asset.createdAt && asset.createdAt.seconds) {
        const date = new Date(asset.createdAt.seconds * 1000);
        const key = `${date.getFullYear()}/${date.getMonth() + 1}`;
        if (monthlyData[key] !== undefined) {
          monthlyData[key]++;
        }
      }
    });
    
    // 拠点別集計
    const baseData = {};
    assets.forEach(asset => {
      const base = asset.baseName || '未設定';
      baseData[base] = (baseData[base] || 0) + 1;
    });
    
    // TOP5のみ
    const top5Bases = Object.entries(baseData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    // グラフ描画
    drawCategoryChart(categoryData);
    drawMonthlyChart(monthlyData);
    drawBaseChart(top5Bases);
    
  } catch (error) {
    console.error('詳細統計読み込みエラー:', error);
  }
}

// カテゴリ別円グラフ
function drawCategoryChart(data) {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          '#1976d2', '#4caf50', '#ff9800', '#f44336', 
          '#9c27b0', '#00bcd4', '#ffeb3b', '#795548'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// 月別折れ線グラフ
function drawMonthlyChart(data) {
  const ctx = document.getElementById('monthlyChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: '登録数',
        data: Object.values(data),
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// 拠点別棒グラフ
function drawBaseChart(data) {
  const ctx = document.getElementById('baseChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d[0]),
      datasets: [{
        label: '資産数',
        data: data.map(d => d[1]),
        backgroundColor: '#4caf50'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// ページ読み込み時
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    loadStatistics().then(() => loadDetailedStats());
  } else {
    window.location.href = '/index.html';
  }
});
