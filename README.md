# 拠点資産シェアシステム

## プロジェクト概要
全国140店舗の塾設備（机、PCなど）の余剰在庫を可視化し、店舗間で再利用できるシステム

## 技術スタック
- **フロントエンド**: PWA (HTML/CSS/JavaScript)
- **バックエンド**: Firebase (Firestore, Storage, Functions)
- **認証**: Firebase Authentication (Google連携)
- **データ連携**: Google Sheets API

## プロジェクト構造
```
asset-share-system/
├── public/              # PWAアプリケーション
│   ├── index.html      # ログイン画面
│   ├── home.html       # ホーム画面（一覧表示）
│   ├── register.html   # 出品登録画面
│   ├── detail.html     # 詳細・申請画面
│   ├── my-items.html   # 自分の出品管理
│   ├── admin.html      # 管理者画面
│   ├── css/            # スタイルシート
│   ├── js/             # JavaScript
│   ├── manifest.json   # PWA設定
│   └── sw.js           # Service Worker
├── functions/          # Firebase Functions
│   ├── index.js        # バックエンドロジック
│   └── package.json
├── firestore.rules     # セキュリティルール
├── storage.rules       # ストレージルール
├── firebase.json       # Firebase設定
└── docs/               # ドキュメント
    ├── setup-guide.md  # セットアップガイド
    ├── user-manual.md  # ユーザーマニュアル
    └── admin-manual.md # 管理者マニュアル
```

## セットアップ手順
詳細は `docs/setup-guide.md` を参照してください

## 開発スケジュール
- Day 1-3: プロトタイプ開発
- Day 4-13: テスト・バグ修正（15拠点）
- Day 14-23: 本格開発
- Day 24-43: 最終テスト・バグ修正
- Day 44-50: 予備日

## テスト拠点
### センターブロック - 都心地域
- 青山BASE
- 麻布十番BASE
- 有明ガーデンBASE
- 六本木BASE
- 世田谷砧BASE
- 碑文谷BASE
- 西馬込BASE
- 平和台BASE

### 西ブロック - 九州地域
- 鹿児島BASE
- 長崎BASE
- 佐賀BASE
- 飯塚秋松BASE
