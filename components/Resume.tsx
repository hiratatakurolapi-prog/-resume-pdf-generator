import React from 'react';
import { ResumeData } from '@/types';

interface ResumeProps {
  data: ResumeData;
}

export const Resume: React.FC<ResumeProps> = ({ data }) => {
  return (
    <div className="pdf-preview font-sans">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">履歴書</h1>
        <p className="text-sm text-gray-600">
          {new Date().toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}現在
        </p>
      </div>

      {/* 基本情報テーブル */}
      <table className="w-full border-collapse border border-gray-800 mb-6 avoid-break">
        <tbody>
          <tr>
            <td className="border border-gray-800 bg-gray-100 px-3 py-2 w-32 font-medium align-top">
              氏名
            </td>
            <td className="border border-gray-800 px-3 py-2" colSpan={3}>
              <div className="text-lg font-bold">{data.name || '　'}</div>
              <div className="text-sm text-gray-600">（{data.kana || '　'}）</div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-800 bg-gray-100 px-3 py-2 font-medium align-top">
              生年月日
            </td>
            <td className="border border-gray-800 px-3 py-2">
              {data.birthDate || '　'}
            </td>
            <td className="border border-gray-800 bg-gray-100 px-3 py-2 w-24 font-medium align-top">
              性別
            </td>
            <td className="border border-gray-800 px-3 py-2 w-32">
              {data.gender || '　'}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-800 bg-gray-100 px-3 py-2 font-medium align-top">
              郵便番号
            </td>
            <td className="border border-gray-800 px-3 py-2" colSpan={3}>
              {data.postalCode || '　'}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-800 bg-gray-100 px-3 py-2 font-medium align-top">
              住所
            </td>
            <td className="border border-gray-800 px-3 py-2" colSpan={3}>
              <div className="preserve-linebreaks">{data.address || '　'}</div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-800 bg-gray-100 px-3 py-2 font-medium align-top">
              電話番号
            </td>
            <td className="border border-gray-800 px-3 py-2">
              {data.phone || '　'}
            </td>
            <td className="border border-gray-800 bg-gray-100 px-3 py-2 font-medium align-top">
              メール
            </td>
            <td className="border border-gray-800 px-3 py-2">
              {data.email || '　'}
            </td>
          </tr>
        </tbody>
      </table>

      {/* 学歴 */}
      <div className="mb-6 avoid-break">
        <h2 className="text-lg font-bold mb-2 text-center bg-gray-100 py-1 border border-gray-800">
          学歴
        </h2>
        <table className="w-full border-collapse border border-gray-800">
          <tbody>
            {data.education && data.education.length > 0 ? (
              data.education.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-800 px-3 py-2 w-32 align-top">
                    {item.date}
                  </td>
                  <td className="border border-gray-800 px-3 py-2 align-top">
                    <div className="preserve-linebreaks">{item.content}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-800 px-3 py-2 w-32">　</td>
                <td className="border border-gray-800 px-3 py-2">　</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 職歴 */}
      <div className="mb-6 avoid-break">
        <h2 className="text-lg font-bold mb-2 text-center bg-gray-100 py-1 border border-gray-800">
          職歴
        </h2>
        <table className="w-full border-collapse border border-gray-800">
          <tbody>
            {data.workHistory && data.workHistory.length > 0 ? (
              data.workHistory.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-800 px-3 py-2 w-32 align-top">
                    {item.date}
                  </td>
                  <td className="border border-gray-800 px-3 py-2 align-top">
                    <div className="preserve-linebreaks">{item.content}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-800 px-3 py-2 w-32">　</td>
                <td className="border border-gray-800 px-3 py-2">　</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 資格・免許 */}
      <div className="avoid-break">
        <h2 className="text-lg font-bold mb-2 text-center bg-gray-100 py-1 border border-gray-800">
          資格・免許
        </h2>
        <table className="w-full border-collapse border border-gray-800">
          <tbody>
            {data.qualifications && data.qualifications.length > 0 ? (
              data.qualifications.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-800 px-3 py-2 w-32 align-top">
                    {item.date}
                  </td>
                  <td className="border border-gray-800 px-3 py-2 align-top">
                    <div className="preserve-linebreaks">{item.content}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-800 px-3 py-2 w-32">　</td>
                <td className="border border-gray-800 px-3 py-2">　</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
