# Firebaseセットアップガイド

このガイドでは、Firebase プロジェクトの作成から本システムのデプロイまでの手順を説明します。

## 前提条件
- Google アカウント（管理者権限）
- Google Chrome ブラウザ

---

## Step 1: Firebase プロジェクトの作成

### 1-1. Firebase Console にアクセス
1. ブラウザで https://console.firebase.google.com/ を開く
2. Google アカウントでログイン
3. 「プロジェクトを追加」をクリック

### 1-2. プロジェクト情報の入力
1. **プロジェクト名**: `asset-share-system`（任意の名前でOK）
2. 「続行」をクリック
3. **Google アナリティクス**: 「有効にする」を選択（推奨）
4. 「続行」をクリック
5. アナリティクスアカウント: 「Default Account for Firebase」を選択
6. 「プロジェクトを作成」をクリック
7. 作成完了まで待機（約30秒）
8. 「続行」をクリック

---

## Step 2: Firebaseの初期設定

### 2-1. ウェブアプリの追加
1. プロジェクトのホーム画面で「ウェブ」アイコン（</> マーク）をクリック
2. **アプリのニックネーム**: `拠点資産シェアシステム`
3. ☑ **Firebase Hosting も設定する** にチェック
4. 「アプリを登録」をクリック
5. **Firebase SDK の追加**: 表示されたコードをコピー（後で使用）
   ```javascript
   const firebaseConfig = {
     apiKey: "xxx",
     authDomain: "xxx",
     projectId: "xxx",
     storageBucket: "xxx",
     messagingSenderId: "xxx",
     appId: "xxx"
   };
   ```
6. 「コンソールに進む」をクリック

### 2-2. Authentication の設定
1. 左メニューから「Authentication」をクリック
2. 「始める」をクリック
3. 「Sign-in method」タブをクリック
4. 「Google」をクリック
5. 「有効にする」をオンに切り替え
6. **プロジェクトのサポートメール**: 管理者のメールアドレスを選択
7. 「保存」をクリック

### 2-3. Firestore Database の設定
1. 左メニューから「Firestore Database」をクリック
2. 「データベースの作成」をクリック
3. **セキュリティ保護ルール**: 「本番環境モード」を選択
4. 「次へ」をクリック
5. **ロケーション**: `asia-northeast1 (Tokyo)` を選択
6. 「有効にする」をクリック
7. 作成完了まで待機（約1分）

### 2-4. Cloud Storage の設定
1. 左メニューから「Storage」をクリック
2. 「始める」をクリック
3. 「本番環境モード」を選択
4. 「次へ」をクリック
5. **ロケーション**: `asia-northeast1` を選択
6. 「完了」をクリック

### 2-5. Cloud Functions の有効化
1. 左メニューから「Functions」をクリック
2. 「始める」をクリック
3. アップグレードの案内が表示された場合:
   - 「Blazeプランにアップグレード」をクリック
   - ※無料枠内で使用可能（月間40万回の無料呼び出し）
   - クレジットカード登録が必要ですが、無料枠を超えない限り課金されません

---

## Step 3: Google Cloud の設定

### 3-1. Google Sheets API の有効化
1. https://console.cloud.google.com/ にアクセス
2. 右上のプロジェクト選択から、先ほど作成したFirebaseプロジェクトを選択
3. 左メニュー「APIとサービス」→「ライブラリ」をクリック
4. 検索バーに「Google Sheets API」と入力
5. 「Google Sheets API」をクリック
6. 「有効にする」をクリック

### 3-2. サービスアカウントキーの作成
1. 左メニュー「APIとサービス」→「認証情報」をクリック
2. 「認証情報を作成」→「サービスアカウント」をクリック
3. **サービスアカウント名**: `sheets-integration`
4. 「作成して続行」をクリック
5. **ロール**: 「編集者」を選択
6. 「続行」をクリック
7. 「完了」をクリック
8. 作成されたサービスアカウントをクリック
9. 「キー」タブをクリック
10. 「鍵を追加」→「新しい鍵を作成」をクリック
11. 「JSON」を選択
12. 「作成」をクリック
13. ダウンロードされたJSONファイルを安全な場所に保存

---

## Step 4: ローカル開発環境の準備

### 4-1. Node.js のインストール確認
ターミナル（Windowsの場合はコマンドプロンプト）を開いて以下を実行:
```bash
node -v
npm -v
```

バージョンが表示されればOK。表示されない場合:
1. https://nodejs.org/ にアクセス
2. LTS版をダウンロード＆インストール

### 4-2. Firebase CLI のインストール
```bash
npm install -g firebase-tools
```

### 4-3. Firebase にログイン
```bash
firebase login
```
ブラウザが開くので、Googleアカウントでログイン

---

## Step 5: プロジェクトファイルの配置

### 5-1. プロジェクトフォルダの準備
1. 提供された `asset-share-system` フォルダを任意の場所に配置
2. ターミナルでそのフォルダに移動:
   ```bash
   cd /path/to/asset-share-system
   ```

### 5-2. Firebase プロジェクトの初期化
```bash
firebase init
```

以下の質問に答える:
- **Which Firebase features...**: スペースキーで以下を選択（矢印キーで移動）
  - ☑ Firestore
  - ☑ Functions
  - ☑ Hosting
  - ☑ Storage
  - Enterキーで確定

- **Select a default Firebase project**: 作成したプロジェクトを選択

- **Firestore Rules**: `firestore.rules` を選択（デフォルト）
- **Firestore Indexes**: `firestore.indexes.json` を選択（デフォルト）

- **Functions - Language**: `JavaScript` を選択
- **ESLint**: `No` を選択
- **Install dependencies**: `Yes` を選択

- **Public directory**: `public` と入力
- **Single-page app**: `Yes` を選択
- **GitHub deploys**: `No` を選択
- **Overwrite files**: すべて `No` を選択

- **Storage Rules**: `storage.rules` を選択（デフォルト）

---

## Step 6: 設定ファイルの編集

### 6-1. Firebase 設定の反映
1. `public/js/config.js` を開く
2. Step 2-1 でコピーした Firebase SDK の設定を貼り付け:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

### 6-2. サービスアカウントキーの配置
1. Step 3-2 でダウンロードしたJSONファイルを `functions/` フォルダに配置
2. ファイル名を `service-account-key.json` に変更

### 6-3. スプレッドシートの準備
1. Google スプレッドシートを新規作成
2. シート名: `取引履歴`
3. 1行目に以下の見出しを入力:
   ```
   取引日時 | 品名 | 大分類 | 中分類 | 数量 | 経費振替額 | 
   出品拠点 | 出品者名 | 出品地域 | 出品ブロック | 
   受取拠点 | 受取者名 | 受取地域 | 受取ブロック
   ```
4. スプレッドシートのURLから **スプレッドシートID** をコピー
   - URL例: `https://docs.google.com/spreadsheets/d/【ここがID】/edit`
5. Step 3-2 で作成したサービスアカウントのメールアドレスに、このスプレッドシートの「編集者」権限を付与

### 6-4. Functions の環境変数設定
```bash
firebase functions:config:set sheets.id="YOUR_SPREADSHEET_ID"
```

---

## Step 7: 初期データの投入

### 7-1. Firestore にアクセス
1. Firebase Console で「Firestore Database」を開く
2. 「データ」タブを表示

### 7-2. 拠点マスタの登録
「コレクションを開始」をクリック:
- **コレクションID**: `bases`
- 「次へ」をクリック

以下のドキュメントを順番に追加:

**ドキュメント1:**
- ドキュメントID: `CB-TC-001`
- フィールド:
  - baseName (string): `青山BASE`
  - regionName (string): `都心地域`
  - blockName (string): `センターブロック`
  - isActive (boolean): `true`
  - createdAt (timestamp): 現在時刻

※同様に以下のBASEも登録:
- CB-TC-002: 麻布十番BASE
- CB-TC-003: 有明ガーデンBASE
- CB-TC-004: 六本木BASE
- CB-TC-005: 世田谷砧BASE
- CB-TC-006: 碑文谷BASE
- CB-TC-007: 西馬込BASE
- CB-TC-008: 平和台BASE
- WB-KY-001: 鹿児島BASE（西ブロック、九州地域）
- WB-KY-002: 長崎BASE（西ブロック、九州地域）
- WB-KY-003: 佐賀BASE（西ブロック、九州地域）
- WB-KY-004: 飯塚秋松BASE（西ブロック、九州地域）

### 7-3. カテゴリーマスタの登録
「コレクションを開始」をクリック:
- **コレクションID**: `categories`

以下を登録:
1. 机類 > 生徒用机
2. 机類 > 講師用机
3. 椅子類 > 生徒用椅子
4. 椅子類 > 講師用椅子
5. PC・周辺機器 > デスクトップPC
6. PC・周辺機器 > ノートPC
7. PC・周辺機器 > プリンター
8. 教材・備品 > ホワイトボード
9. 教材・備品 > プロジェクター
10. その他 > その他

---

## Step 8: デプロイ

### 8-1. 全体のデプロイ
```bash
firebase deploy
```

完了すると、Hosting URLが表示されます:
```
Hosting URL: https://your-project.web.app
```

### 8-2. 動作確認
1. 表示されたURLにアクセス
2. Google アカウントでログイン
3. 初回ログイン時、拠点選択画面が表示されます

---

## Step 9: ユーザーの拠点設定

### 9-1. 初回ログイン
各ユーザーが初回ログインすると、Firestore に `users` コレクションが自動作成されます。

### 9-2. 拠点の紐付け（管理者作業）
1. Firebase Console で「Firestore Database」を開く
2. `users` コレクションを表示
3. 各ユーザーのドキュメントを開く
4. 以下のフィールドを編集:
   - baseId: 拠点ID（例: `CB-TC-001`）
   - baseName: 拠点名（例: `青山BASE`）
   - regionName: 地域名（例: `都心地域`）
   - blockName: ブロック名（例: `センターブロック`）

---

## トラブルシューティング

### エラー: Firebase CLI が見つからない
```bash
npm install -g firebase-tools
```

### エラー: 権限不足
```bash
firebase login --reauth
```

### デプロイ後、画面が真っ白
- ブラウザのキャッシュをクリア（Ctrl+Shift+Delete）
- シークレットウィンドウで開く

### ログインできない
- Firebase Console の Authentication で Google プロバイダーが有効か確認
- 承認済みドメインに Hosting URL が追加されているか確認

---

## 次のステップ
- `docs/user-manual.md` - ユーザー向け操作マニュアル
- `docs/admin-manual.md` - 管理者向けマニュアル

## サポート
問題が発生した場合は、エラーメッセージと画面のスクリーンショットを共有してください。
