import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: '履歴書・職務経歴書 PDF生成システム',
  description: '日本語完全対応の履歴書・職務経歴書PDF生成システム。文字化けゼロで転職活動に必要な書類を簡単に作成できます。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
