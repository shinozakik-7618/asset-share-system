const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {google} = require('googleapis');

admin.initializeApp();

// Google Sheets API 認証
const auth = new google.auth.GoogleAuth({
  keyFile: './service-account-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({version: 'v4', auth});

/**
 * 取引完了時にスプレッドシートに記録し、データをアーカイブ
 */
exports.completeTransaction = functions.https.onCall(async (data, context) => {
  // 認証チェック
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'ユーザー認証が必要です');
  }

  const {itemId, approvedUserId} = data;

  try {
    const db = admin.firestore();
    const itemRef = db.collection('items').doc(itemId);
    const itemDoc = await itemRef.get();

    if (!itemDoc.exists) {
      throw new functions.https.HttpsError('not-found', '出品が見つかりません');
    }

    const itemData = itemDoc.data();

    // 権限チェック：出品者のみ実行可能
    if (itemData.ownerUserId !== context.auth.uid) {
      throw new functions.https.HttpsError('permission-denied', '権限がありません');
    }

    // 承認された申請者を取得
    const approvedApplicant = itemData.applicants.find(
      app => app.userId === approvedUserId
    );

    if (!approvedApplicant) {
      throw new functions.https.HttpsError('not-found', '申請者が見つかりません');
    }

    // トランザクションデータ作成
    const transactionData = {
      itemId: itemId,
      itemName: itemData.itemName,
      largeCategory: itemData.largeCategory,
      mediumCategory: itemData.mediumCategory,
      quantity: itemData.quantity,
      transferCost: itemData.transferCost,

      fromUserId: itemData.ownerUserId,
      fromUserName: itemData.ownerName,
      fromBaseId: itemData.ownerBaseId,
      fromBaseName: itemData.ownerBaseName,
      fromRegionName: itemData.ownerRegionName,
      fromBlockName: itemData.ownerBlockName,

      toUserId: approvedApplicant.userId,
      toUserName: approvedApplicant.userName,
      toBaseId: approvedApplicant.baseId,
      toBaseName: approvedApplicant.baseName,
      toRegionName: approvedApplicant.regionName,
      toBlockName: approvedApplicant.blockName,

      completedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // 1. transactions コレクションに保存
    const transactionRef = await db.collection('transactions').add(transactionData);

    // 2. Google スプレッドシートに記録
    await writeToSpreadsheet(transactionData);

    // 3. items から削除
    await itemRef.delete();

    return {
      success: true,
      transactionId: transactionRef.id,
      message: '取引が完了しました'
    };

  } catch (error) {
    console.error('取引完了エラー:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * スプレッドシートに書き込み
 */
async function writeToSpreadsheet(data) {
  const config = functions.config();
  const spreadsheetId = config.sheets?.id;

  if (!spreadsheetId) {
    console.warn('スプレッドシートIDが設定されていません');
    return;
  }

  const now = new Date();
  const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const values = [[
    formattedDate,
    data.itemName,
    data.largeCategory,
    data.mediumCategory,
    data.quantity,
    data.transferCost,
    data.fromBaseName,
    data.fromUserName,
    data.fromRegionName,
    data.fromBlockName,
    data.toBaseName,
    data.toUserName,
    data.toRegionName,
    data.toBlockName
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: '取引履歴!A:N',
    valueInputOption: 'USER_ENTERED',
    resource: {values}
  });
}

/**
 * 90日以上未取引の設備にアラート
 * 毎日午前9時に実行
 */
exports.checkStaleItems = functions.pubsub.schedule('0 9 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    const db = admin.firestore();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const snapshot = await db.collection('items')
      .where('status', '==', 'available')
      .where('updatedAt', '<', ninetyDaysAgo)
      .get();

    console.log(`90日以上未取引の出品: ${snapshot.size}件`);

    // TODO: 通知処理を実装
    // 例: メール送信、Slack通知など

    return null;
  });
