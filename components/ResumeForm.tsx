'use client';

import React from 'react';
import { ResumeData, EducationItem, WorkHistoryItem, QualificationItem } from '@/types';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addEducation = () => {
    updateField('education', [...data.education, { date: '', content: '' }]);
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    updateField('education', updated);
  };

  const removeEducation = (index: number) => {
    updateField('education', data.education.filter((_, i) => i !== index));
  };

  const addWorkHistory = () => {
    updateField('workHistory', [...data.workHistory, { date: '', content: '' }]);
  };

  const updateWorkHistory = (index: number, field: keyof WorkHistoryItem, value: string) => {
    const updated = [...data.workHistory];
    updated[index] = { ...updated[index], [field]: value };
    updateField('workHistory', updated);
  };

  const removeWorkHistory = (index: number) => {
    updateField('workHistory', data.workHistory.filter((_, i) => i !== index));
  };

  const addQualification = () => {
    updateField('qualifications', [...data.qualifications, { date: '', content: '' }]);
  };

  const updateQualification = (index: number, field: keyof QualificationItem, value: string) => {
    const updated = [...data.qualifications];
    updated[index] = { ...updated[index], [field]: value };
    updateField('qualifications', updated);
  };

  const removeQualification = (index: number) => {
    updateField('qualifications', data.qualifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* 基本情報 */}
      <div>
        <h3 className="text-lg font-bold mb-3">基本情報</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">氏名</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="山田 太郎"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ふりがな</label>
            <input
              type="text"
              value={data.kana}
              onChange={(e) => updateField('kana', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="やまだ たろう"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">生年月日</label>
            <input
              type="text"
              value={data.birthDate}
              onChange={(e) => updateField('birthDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1990年1月1日（34歳）"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">性別</label>
            <input
              type="text"
              value={data.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="男性 / 女性"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">郵便番号</label>
            <input
              type="text"
              value={data.postalCode}
              onChange={(e) => updateField('postalCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="〒100-0001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">住所</label>
            <textarea
              value={data.address}
              onChange={(e) => updateField('address', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="東京都千代田区千代田1-1-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">電話番号</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="090-1234-5678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">メールアドレス</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@example.com"
            />
          </div>
        </div>
      </div>

      {/* 学歴 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">学歴</h3>
          <button
            onClick={addEducation}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            + 追加
          </button>
        </div>
        <div className="space-y-2">
          {data.education.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateEducation(index, 'date', e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2010年4月"
              />
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateEducation(index, 'content', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="○○大学 ○○学部 入学"
              />
              <button
                onClick={() => removeEducation(index)}
                className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 職歴 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">職歴</h3>
          <button
            onClick={addWorkHistory}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            + 追加
          </button>
        </div>
        <div className="space-y-2">
          {data.workHistory.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateWorkHistory(index, 'date', e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2014年4月"
              />
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateWorkHistory(index, 'content', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="株式会社○○ 入社"
              />
              <button
                onClick={() => removeWorkHistory(index)}
                className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 資格・免許 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">資格・免許</h3>
          <button
            onClick={addQualification}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            + 追加
          </button>
        </div>
        <div className="space-y-2">
          {data.qualifications.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateQualification(index, 'date', e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2015年6月"
              />
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateQualification(index, 'content', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="普通自動車第一種運転免許 取得"
              />
              <button
                onClick={() => removeQualification(index)}
                className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
