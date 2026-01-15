'use client';

import { useState } from 'react';
import { Resume } from '@/components/Resume';
import { CareerSheet } from '@/components/CareerSheet';
import { ResumeForm } from '@/components/ResumeForm';
import { CareerForm } from '@/components/CareerForm';
import { ResumeData, CareerData } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'resume' | 'career'>('resume');
  const [isGenerating, setIsGenerating] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    kana: '',
    birthDate: '',
    gender: '',
    address: '',
    postalCode: '',
    phone: '',
    email: '',
    education: [{ date: '', content: '' }],
    workHistory: [{ date: '', content: '' }],
    qualifications: [{ date: '', content: '' }],
  });

  const [careerData, setCareerData] = useState<CareerData>({
    name: '',
    summary: '',
    experiences: [
      {
        period: '',
        company: '',
        position: '',
        description: '',
        achievements: [''],
      },
    ],
    skills: [''],
    certifications: [''],
    pr: '',
  });

  const handleGeneratePDF = async (type: 'resume' | 'career') => {
    const data = type === 'resume' ? resumeData : careerData;
    const fileName =
      type === 'resume'
        ? `履歴書_${data.name || '未入力'}.pdf`
        : `職務経歴書_${data.name || '未入力'}.pdf`;

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ type, data, fileName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'PDF生成失敗');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert('PDFのダウンロードが完了しました！');
    } catch (error) {
      alert(`PDF生成に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            履歴書・職務経歴書 PDF生成システム
          </h1>
          <p className="text-gray-600">
            日本語完全対応・文字化けゼロ保証
          </p>
        </div>

        {/* タブ切り替え */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-8 py-4 font-bold text-lg transition-colors ${
                activeTab === 'resume'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              📄 履歴書
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-8 py-4 font-bold text-lg transition-colors ${
                activeTab === 'career'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              📋 職務経歴書
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 入力エリア */}
          <div className="bg-white rounded-lg shadow-xl p-6 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">入力フォーム</h2>
              <button
                onClick={() => handleGeneratePDF(activeTab)}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    生成中...
                  </span>
                ) : (
                  '📥 PDFをダウンロード'
                )}
              </button>
            </div>

            <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {activeTab === 'resume' ? (
                <ResumeForm data={resumeData} onChange={setResumeData} />
              ) : (
                <CareerForm data={careerData} onChange={setCareerData} />
              )}
            </div>
          </div>

          {/* プレビューエリア */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">プレビュー</h2>
            <div className="overflow-auto max-h-[calc(100vh-200px)] bg-gray-100 rounded-lg p-4">
              {activeTab === 'resume' ? (
                <Resume data={resumeData} />
              ) : (
                <CareerSheet data={careerData} />
              )}
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2026 履歴書・職務経歴書PDF生成システム</p>
          <p className="mt-1">
            Powered by Next.js + Puppeteer + Noto Sans JP
          </p>
        </div>
      </div>
    </div>
  );
}
