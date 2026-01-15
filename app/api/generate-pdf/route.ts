import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Resume } from '@/components/Resume';
import { CareerSheet } from '@/components/CareerSheet';
import { renderToString } from 'react-dom/server';

export async function POST(request: NextRequest) {
  try {
    const { type, data, fileName } = await request.json();

    // コンポーネント選択
    const Component = type === 'resume' ? Resume : CareerSheet;
    const htmlContent = renderToString(<Component data={data} />);

    // 完全なHTMLドキュメント生成（文字化け防止の重要設定）
    const fullHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: 10pt;
      line-height: 1.6;
      color: #000;
      background: #fff;
    }
    
    @page {
      size: A4 portrait;
      margin: 15mm 10mm;
    }
    
    .preserve-linebreaks {
      white-space: pre-wrap;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    
    .avoid-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    
    table {
      page-break-inside: auto;
    }
    
    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }
    
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
    }
    
    /* Tailwindクラスの実装 */
    .pdf-preview { width: 100%; padding: 0; margin: 0; }
    .w-full { width: 100%; }
    .w-24 { width: 6rem; }
    .w-32 { width: 8rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mb-8 { margin-bottom: 2rem; }
    .ml-2 { margin-left: 0.5rem; }
    .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .pb-1 { padding-bottom: 0.25rem; }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    .text-base { font-size: 1rem; line-height: 1.5rem; }
    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    .text-2xl { font-size: 1.5rem; line-height: 2rem; }
    .font-bold { font-weight: 700; }
    .font-medium { font-weight: 500; }
    .font-sans { font-family: 'Noto Sans JP', sans-serif; }
    .border { border-width: 1px; }
    .border-l-4 { border-left-width: 4px; }
    .border-b-2 { border-bottom-width: 2px; }
    .border-collapse { border-collapse: collapse; }
    .border-gray-800 { border-color: #1f2937; }
    .bg-gray-50 { background-color: #f9fafb; }
    .bg-gray-100 { background-color: #f3f4f6; }
    .text-gray-600 { color: #4b5563; }
    .list-disc { list-style-type: disc; }
    .list-inside { list-style-position: inside; }
    .space-y-1 > * + * { margin-top: 0.25rem; }
    .leading-relaxed { line-height: 1.625; }
    .align-top { vertical-align: top; }
    .flex { display: flex; }
    .justify-between { justify-content: space-between; }
    .items-end { align-items: flex-end; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
    `.trim();

    // Puppeteer起動（日本語フォント完全対応設定）
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--font-render-hinting=none',
        '--disable-font-subpixel-positioning',
      ],
    });

    const page = await browser.newPage();

    // コンテンツ設定（UTF-8明示）
    await page.setContent(fullHtml, {
      waitUntil: 'networkidle0',
    });

    // フォント読み込み完了待機（重要：文字化け防止）
    await page.evaluateHandle('document.fonts.ready');

    // PDF生成（300dpi相当）
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '15mm',
        right: '10mm',
        bottom: '15mm',
        left: '10mm',
      },
      displayHeaderFooter: false,
    });

    await browser.close();

    // UTF-8ファイル名エンコード（RFC 5987準拠）
    const encodedFileName = encodeURIComponent(fileName);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"; filename*=UTF-8''${encodedFileName}`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('PDF生成エラー:', error);
    return NextResponse.json(
      { error: 'PDF生成に失敗しました', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
