# データベース設計書

## Firestore コレクション構造

### 1. users (ユーザー情報)
```
users/{userId}
  - email: string           // メールアドレス
  - displayName: string     // 表示名
  - baseId: string         // 拠点ID
  - baseName: string       // 拠点名
  - regionName: string     // 地域名
  - blockName: string      // ブロック名
  - role: string           // 権限 (user/admin)
  - createdAt: timestamp
  - lastLoginAt: timestamp
```

### 2. bases (拠点マスタ)
```
bases/{baseId}
  - baseName: string       // 拠点名
  - regionName: string     // 地域名
  - blockName: string      // ブロック名
  - isActive: boolean      // 有効/無効
  - createdAt: timestamp
```

**初期データ（12拠点）:**
- センターブロック > 都心地域
  - CB-TC-001: 青山BASE
  - CB-TC-002: 麻布十番BASE
  - CB-TC-003: 有明ガーデンBASE
  - CB-TC-004: 六本木BASE
  - CB-TC-005: 世田谷砧BASE
  - CB-TC-006: 碑文谷BASE
  - CB-TC-007: 西馬込BASE
  - CB-TC-008: 平和台BASE

- 西ブロック > 九州地域
  - WB-KY-001: 鹿児島BASE
  - WB-KY-002: 長崎BASE
  - WB-KY-003: 佐賀BASE
  - WB-KY-004: 飯塚秋松BASE

### 3. categories (設備分類マスタ)
```
categories/{categoryId}
  - largeName: string      // 大分類
  - mediumName: string     // 中分類
  - order: number          // 表示順
  - isActive: boolean
```

**初期データ例:**
- 机類 > 生徒用机
- 机類 > 講師用机
- 椅子類 > 生徒用椅子
- 椅子類 > 講師用椅子
- PC・周辺機器 > デスクトップPC
- PC・周辺機器 > ノートPC
- PC・周辺機器 > プリンター
- 教材・備品 > ホワイトボード
- 教材・備品 > プロジェクター
- その他 > その他

### 4. items (出品設備)
```
items/{itemId}
  - images: array<string>       // 画像URL配列（最大5枚）
  - largeCategory: string       // 大分類
  - mediumCategory: string      // 中分類
  - itemName: string            // 品名
  - quantity: number            // 数量
  - size: string                // サイズ（任意）
  - transferCost: number        // 経費振替額
  - usageStatus: string         // 利用状況（未使用/稼働中/故障）
  - condition: string           // 状態の詳細（任意）
  - notes: string               // 備考（任意）
  
  - ownerUserId: string         // 出品者ID
  - ownerName: string           // 出品者名
  - ownerBaseId: string         // 出品拠点ID
  - ownerBaseName: string       // 出品拠点名
  - ownerRegionName: string     // 出品地域名
  - ownerBlockName: string      // 出品ブロック名
  
  - status: string              // ステータス（available/pending/completed）
  - applicants: array           // 申請者リスト
  - approvedUserId: string      // 承認された申請者ID（pending時）
  - approvedUserName: string
  - approvedBaseId: string
  - approvedBaseName: string
  
  - createdAt: timestamp
  - updatedAt: timestamp
  - completedAt: timestamp      // 取引完了日時
```

**applicants 配列の構造:**
```
{
  userId: string,
  userName: string,
  baseId: string,
  baseName: string,
  regionName: string,
  blockName: string,
  appliedAt: timestamp,
  message: string  // 申請メッセージ
}
```

### 5. transactions (取引完了履歴)
```
transactions/{transactionId}
  - itemId: string              // 元の出品ID
  - itemName: string            // 品名
  - largeCategory: string
  - mediumCategory: string
  - quantity: number
  - transferCost: number
  
  - fromUserId: string          // 出品者ID
  - fromUserName: string
  - fromBaseId: string
  - fromBaseName: string
  - fromRegionName: string
  - fromBlockName: string
  
  - toUserId: string            // 受取者ID
  - toUserName: string
  - toBaseId: string
  - toBaseName: string
  - toRegionName: string
  - toBlockName: string
  
  - completedAt: timestamp      // 完了日時
  - createdAt: timestamp
```

### 6. settings (システム設定)
```
settings/config
  - spreadsheetId: string       // 連携先スプレッドシートID
  - notificationDays: number    // 未取引アラート日数（デフォルト90日）
  - version: string             // システムバージョン
```

## インデックス設定

### items コレクション
- status + createdAt (降順) : 一覧表示用
- status + largeCategory + createdAt (降順) : カテゴリー絞り込み用
- status + ownerBlockName + createdAt (降順) : ブロック絞り込み用
- status + ownerRegionName + createdAt (降順) : 地域絞り込み用
- ownerUserId + status : 自分の出品一覧用
- status + updatedAt (昇順) : 未取引アラート用

### transactions コレクション
- completedAt (降順) : 取引履歴表示用
- fromBaseId + completedAt (降順) : 拠点別履歴用
- toBaseId + completedAt (降順) : 拠点別履歴用

## セキュリティルール方針

### items コレクション
- 読み取り: 認証済みユーザー全員
- 作成: 認証済みユーザー全員
- 更新: 出品者本人のみ (ownerUserId == auth.uid)
- 削除: 出品者本人のみ

### transactions コレクション
- 読み取り: 認証済みユーザー全員
- 作成: Cloud Functions のみ
- 更新/削除: 管理者のみ

### users, bases, categories コレクション
- 読み取り: 認証済みユーザー全員
- 作成/更新/削除: 管理者のみ
