# クイックスタートガイド

## 🚀 今すぐ始める（3ステップ）

### Step 1: Firebase プロジェクト作成（5分）

1. https://console.firebase.google.com/ にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名: `asset-share-system` を入力
4. 「続行」→「プロジェクトを作成」

### Step 2: 必要なサービスを有効化（10分）

#### Authentication（認証）
1. 左メニュー「Authentication」→「始める」
2. 「Google」を選択して有効化
3. サポートメールを選択して「保存」

#### Firestore Database（データベース）
1. 左メニュー「Firestore Database」→「データベースの作成」
2. 「本番環境モード」→「次へ」
3. ロケーション: `asia-northeast1 (Tokyo)` →「有効にする」

#### Storage（画像保存）
1. 左メニュー「Storage」→「始める」
2. 「本番環境モード」→「次へ」
3. ロケーション: `asia-northeast1` →「完了」

### Step 3: アプリをデプロイ（10分）

#### 3-1. Firebase CLI をインストール
```bash
npm install -g firebase-tools
firebase login
```

#### 3-2. プロジェクトを解凍して移動
```bash
unzip asset-share-system.zip
cd asset-share-system
```

#### 3-3. Firebase 設定を取得
1. Firebase Console でプロジェクトを開く
2. プロジェクト概要の横にある⚙（設定）→「プロジェクトの設定」
3. 下にスクロールして「マイアプリ」の「Firebase SDK snippet」→「構成」
4. 表示されたコードをコピー

#### 3-4. 設定ファイルを編集
`public/js/config.js` を開いて、コピーした設定を貼り付け:
```javascript
const firebaseConfig = {
  apiKey: "あなたのAPIキー",
  authDomain: "あなたのAuthDomain",
  projectId: "あなたのプロジェクトID",
  storageBucket: "あなたのStorageBucket",
  messagingSenderId: "あなたのMessagingSenderId",
  appId: "あなたのAppId"
};
```

#### 3-5. デプロイ
```bash
firebase init
# すべて Enter キーで進める（デフォルト設定使用）

firebase deploy
```

完了すると、URL が表示されます:
```
Hosting URL: https://your-project.web.app
```

---

## ✅ 初期設定（15分）

### 1. 拠点マスタの登録

Firebase Console → Firestore Database → 「コレクションを開始」

**コレクションID**: `bases`

以下のデータを登録:

| ドキュメントID | baseName | regionName | blockName | isActive |
|--------------|----------|------------|-----------|----------|
| CB-TC-001 | 青山BASE | 都心地域 | センターブロック | true |
| CB-TC-002 | 麻布十番BASE | 都心地域 | センターブロック | true |
| CB-TC-003 | 有明ガーデンBASE | 都心地域 | センターブロック | true |
| CB-TC-004 | 六本木BASE | 都心地域 | センターブロック | true |
| CB-TC-005 | 世田谷砧BASE | 都心地域 | センターブロック | true |
| CB-TC-006 | 碑文谷BASE | 都心地域 | センターブロック | true |
| CB-TC-007 | 西馬込BASE | 都心地域 | センターブロック | true |
| CB-TC-008 | 平和台BASE | 都心地域 | センターブロック | true |
| WB-KY-001 | 鹿児島BASE | 九州地域 | 西ブロック | true |
| WB-KY-002 | 長崎BASE | 九州地域 | 西ブロック | true |
| WB-KY-003 | 佐賀BASE | 九州地域 | 西ブロック | true |
| WB-KY-004 | 飯塚秋松BASE | 九州地域 | 西ブロック | true |

※ `createdAt` フィールドも追加（型: timestamp、値: 現在時刻）

### 2. ユーザーの拠点設定

1. テストユーザーでログイン
2. Firebase Console → Firestore Database → `users` コレクション
3. 各ユーザーのドキュメントを編集:
   - baseId: `CB-TC-001` など
   - baseName: `青山BASE` など
   - regionName: `都心地域` など
   - blockName: `センターブロック` など

### 3. Google スプレッドシート連携（オプション）

1. Google スプレッドシートを新規作成
2. シート名: `取引履歴`
3. 1行目に以下を入力:
   ```
   取引日時 | 品名 | 大分類 | 中分類 | 数量 | 経費振替額 | 
   出品拠点 | 出品者名 | 出品地域 | 出品ブロック | 
   受取拠点 | 受取者名 | 受取地域 | 受取ブロック
   ```
4. スプレッドシートIDをコピー（URLの `/d/` と `/edit` の間）
5. Functions の環境変数に設定:
   ```bash
   firebase functions:config:set sheets.id="YOUR_SPREADSHEET_ID"
   ```
6. 再デプロイ:
   ```bash
   firebase deploy --only functions
   ```

---

## 📱 iOS で使う方法

1. Safari でシステムのURLを開く
2. 画面下部の「共有」アイコンをタップ
3. 「ホーム画面に追加」を選択
4. 「追加」をタップ

→ アプリのようにホーム画面から起動できます！

---

## 🎉 完了！

これでシステムが使えるようになりました。

次は `docs/user-manual.md` でユーザー向けの使い方を確認してください。
