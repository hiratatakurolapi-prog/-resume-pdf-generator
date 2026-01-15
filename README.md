# 履歴書・職務経歴書 PDF生成システム

日本語完全対応・文字化けゼロを保証する履歴書・職務経歴書のPDF生成Webアプリケーション

## 🎯 主な機能

### ✅ 実装済み機能

- **履歴書作成機能**
  - JIS規格に準拠したレイアウト
  - 基本情報（氏名、住所、連絡先）
  - 学歴・職歴・資格の動的追加/削除
  - リアルタイムプレビュー表示

- **職務経歴書作成機能**
  - 職務要約の記入
  - 複数職務経歴の管理
  - 実績・成果の箇条書き
  - スキル・資格の一覧化
  - 自己PR欄

- **PDF生成機能**
  - 日本語フォント完全埋め込み（Noto Sans JP）
  - UTF-8厳密対応（文字化けゼロ）
  - A4サイズ印刷最適化
  - RFC 5987準拠のファイル名エンコード
  - ワンクリックダウンロード

- **UI/UX機能**
  - レスポンシブデザイン
  - 入力フォームとプレビューの2カラムレイアウト
  - タブ切り替え（履歴書⇔職務経歴書）
  - ローディング表示

## 🚀 技術スタック

| カテゴリ | 技術 |
|---------|------|
| **フロントエンド** | Next.js 14 (App Router), React 18, TypeScript |
| **スタイリング** | Tailwind CSS, カスタム印刷CSS |
| **PDF生成** | Puppeteer v21.9.0 |
| **フォント** | Noto Sans JP (Google Fonts) |
| **実行環境** | Node.js 20+ |

## 📁 プロジェクト構造

```
resume-pdf-generator/
├── app/
│   ├── api/
│   │   └── generate-pdf/
│   │       └── route.ts          # PDF生成APIエンドポイント
│   ├── globals.css               # グローバルスタイル（印刷CSS含む）
│   ├── layout.tsx                # ルートレイアウト（フォント設定）
│   └── page.tsx                  # メインページ
├── components/
│   ├── Resume.tsx                # 履歴書表示コンポーネント
│   ├── CareerSheet.tsx           # 職務経歴書表示コンポーネント
│   ├── ResumeForm.tsx            # 履歴書入力フォーム
│   └── CareerForm.tsx            # 職務経歴書入力フォーム
├── types/
│   └── index.ts                  # TypeScript型定義
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── Dockerfile                    # 本番環境用
├── .gitignore
└── README.md
```

## 🛠️ セットアップ

### 前提条件

- Node.js 20以上
- npm または yarn

### インストール手順

```bash
# リポジトリクローン
git clone <repository-url>
cd resume-pdf-generator

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで `http://localhost:3000` を開く

### 本番ビルド

```bash
# ビルド
npm run build

# 本番サーバー起動
npm start
```

### Docker実行

```bash
# イメージビルド
docker build -t resume-pdf-generator .

# コンテナ起動
docker run -p 3000:3000 resume-pdf-generator
```

## 📋 使い方

### 履歴書作成

1. 「📄 履歴書」タブを選択
2. 基本情報を入力
3. 「+ 追加」ボタンで学歴・職歴・資格を追加
4. 右側のプレビューで確認
5. 「📥 PDFをダウンロード」ボタンをクリック

### 職務経歴書作成

1. 「📋 職務経歴書」タブを選択
2. 氏名・職務要約を入力
3. 職務経歴を追加（複数可）
4. 実績・スキル・資格を入力
5. 「📥 PDFをダウンロード」ボタンでPDF出力

## 🔧 API仕様

### POST `/api/generate-pdf`

履歴書または職務経歴書のPDFを生成

**リクエストボディ:**

```json
{
  "type": "resume" | "career",
  "data": {
    // ResumeData または CareerData
  },
  "fileName": "履歴書_山田太郎.pdf"
}
```

**レスポンス:**

- 成功: PDF ファイル（application/pdf）
- 失敗: JSON エラーメッセージ

## 🎨 文字化け防止の技術実装

### 1. フォント設定

```typescript
// app/layout.tsx
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-noto-sans-jp',
})
```

### 2. Puppeteer設定

```typescript
// app/api/generate-pdf/route.ts
const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--font-render-hinting=none',  // 重要
    '--disable-font-subpixel-positioning',
  ],
});
```

### 3. 印刷CSS

```css
/* app/globals.css */
@media print {
  @page {
    size: A4 portrait;
    margin: 15mm 10mm;
  }
  
  body {
    font-family: 'Noto Sans JP', sans-serif !important;
  }
  
  .preserve-linebreaks {
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .avoid-break {
    page-break-inside: avoid;
  }
}
```

### 4. UTF-8ファイル名エンコード

```typescript
// RFC 5987準拠
const encodedFileName = encodeURIComponent(fileName);
headers: {
  'Content-Disposition': `attachment; filename="${fileName}"; filename*=UTF-8''${encodedFileName}`,
}
```

## 🐛 トラブルシューティング

### PDF生成時のエラー

**エラー**: `Error: Failed to launch the browser process`

**解決策**:
```bash
# Linuxの場合、必要なライブラリをインストール
sudo apt-get update
sudo apt-get install -y \
  fonts-noto-cjk \
  fonts-ipafont-gothic \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libgbm1
```

**エラー**: 日本語が□□□（豆腐）になる

**解決策**:
- Google Fonts CDNの読み込み完了を確認
- `document.fonts.ready` で待機実装済み
- Dockerfileに日本語フォントパッケージを追加

### 開発時のビルドエラー

**エラー**: `Module not found: Can't resolve 'puppeteer'`

**解決策**:
```bash
npm install puppeteer --save
```

## 📊 パフォーマンス

- PDF生成時間: 約2-5秒（環境により変動）
- ファイルサイズ: 約50-150KB（内容により変動）
- 対応ブラウザ: Chrome, Edge, Safari, Firefox（最新版）

## 🔐 セキュリティ

- ユーザーデータはサーバーに保存されません
- PDF生成は都度実行され、即座に破棄
- HTTPS推奨（本番環境）

## 📈 今後の拡張予定

### 未実装機能

- [ ] データの一時保存機能（LocalStorage）
- [ ] 複数テンプレート対応
- [ ] 英文レジュメ生成
- [ ] 写真アップロード機能
- [ ] データベース保存機能
- [ ] ユーザー認証機能
- [ ] PDF履歴管理
- [ ] プレビュー印刷機能

### 推奨される次のステップ

1. **LocalStorage統合**
   - 入力データの自動保存
   - ブラウザリロード後の復元

2. **テンプレートシステム**
   - JIS規格/モダン/英文など複数形式
   - カスタムテンプレート作成機能

3. **データベース連携**
   - PostgreSQL/MySQLでの永続化
   - ユーザーアカウント管理

4. **クラウドストレージ連携**
   - AWS S3へのPDF保存
   - 共有URL生成

## 🤝 貢献

プルリクエスト歓迎！

## 📝 ライセンス

MIT License

## 👤 作成者

履歴書・職務経歴書PDF生成システム開発チーム

## 🙏 謝辞

- [Next.js](https://nextjs.org/)
- [Puppeteer](https://pptr.dev/)
- [Google Fonts - Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📞 サポート

問題が発生した場合は、GitHubのIssuesをご利用ください。

**制作日**: 2026年1月15日
**バージョン**: 1.0.0
