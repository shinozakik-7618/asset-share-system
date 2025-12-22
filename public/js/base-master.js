let allBases = [];
document.addEventListener('DOMContentLoaded', async () => {
  await loadBases();
});
async function loadBases() {
  const loading = document.getElementById('loading');
  const baseTable = document.getElementById('baseTable');
  const baseTableBody = document.getElementById('baseTableBody');
  const baseCount = document.getElementById('baseCount');
  loading.style.display = 'block';
  baseTable.style.display = 'none';
  try {
    const snapshot = await db.collection('baseMaster').orderBy('blockNo').orderBy('regionNo').orderBy('baseNo').get();
    allBases = [];
    baseTableBody.innerHTML = '';
    snapshot.forEach(doc => {
      const base = { id: doc.id, ...doc.data() };
      allBases.push(base);
      const row = document.createElement('tr');
      row.innerHTML = `<td>${base.block}</td><td>${base.region}</td><td>${base.baseName}</td><td>${base.baseId}</td>`;
      baseTableBody.appendChild(row);
    });
    baseCount.textContent = allBases.length;
    loading.style.display = 'none';
    baseTable.style.display = 'table';
  } catch (error) {
    console.error('拠点データ取得エラー:', error);
    loading.innerHTML = '<p style="color: red;">データの取得に失敗しました</p>';
  }
}
function goToHome() {
  window.location.href = '/home.html';
}

