'use client';

import React from 'react';
import { CareerData, ExperienceItem } from '@/types';

interface CareerFormProps {
  data: CareerData;
  onChange: (data: CareerData) => void;
}

export const CareerForm: React.FC<CareerFormProps> = ({ data, onChange }) => {
  const updateField = (field: keyof CareerData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addExperience = () => {
    updateField('experiences', [
      ...data.experiences,
      { period: '', company: '', position: '', description: '', achievements: [''] }
    ]);
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...data.experiences];
    updated[index] = { ...updated[index], [field]: value };
    updateField('experiences', updated);
  };

  const removeExperience = (index: number) => {
    updateField('experiences', data.experiences.filter((_, i) => i !== index));
  };

  const addAchievement = (expIndex: number) => {
    const updated = [...data.experiences];
    updated[expIndex].achievements = [...updated[expIndex].achievements, ''];
    updateField('experiences', updated);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...data.experiences];
    updated[expIndex].achievements[achIndex] = value;
    updateField('experiences', updated);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...data.experiences];
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_, i) => i !== achIndex);
    updateField('experiences', updated);
  };

  const addSkill = () => {
    updateField('skills', [...data.skills, '']);
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...data.skills];
    updated[index] = value;
    updateField('skills', updated);
  };

  const removeSkill = (index: number) => {
    updateField('skills', data.skills.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    updateField('certifications', [...data.certifications, '']);
  };

  const updateCertification = (index: number, value: string) => {
    const updated = [...data.certifications];
    updated[index] = value;
    updateField('certifications', updated);
  };

  const removeCertification = (index: number) => {
    updateField('certifications', data.certifications.filter((_, i) => i !== index));
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
        </div>
      </div>

      {/* 職務要約 */}
      <div>
        <h3 className="text-lg font-bold mb-3">職務要約</h3>
        <textarea
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="これまでの職務経験の概要を記載してください。"
        />
      </div>

      {/* 職務経歴 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">職務経歴</h3>
          <button
            onClick={addExperience}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            + 追加
          </button>
        </div>
        <div className="space-y-4">
          {data.experiences.map((exp, expIndex) => (
            <div key={expIndex} className="border border-gray-300 rounded p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">職務経歴 {expIndex + 1}</h4>
                <button
                  onClick={() => removeExperience(expIndex)}
                  className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                >
                  削除
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">期間</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => updateExperience(expIndex, 'period', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2018年4月 ～ 2022年3月"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">会社名</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="株式会社○○"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">役職・部署</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="営業部 主任"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">業務内容</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(expIndex, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="担当した業務内容を具体的に記載してください。"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">実績・成果</label>
                    <button
                      onClick={() => addAchievement(expIndex)}
                      className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      + 追加
                    </button>
                  </div>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(expIndex, achIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="売上前年比120%達成"
                        />
                        <button
                          onClick={() => removeAchievement(expIndex, achIndex)}
                          className="px-2 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                        >
                          削除
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* スキル */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">活かせる経験・スキル</h3>
          <button
            onClick={addSkill}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            + 追加
          </button>
        </div>
        <div className="space-y-2">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="プロジェクトマネジメント経験5年"
              />
              <button
                onClick={() => removeSkill(index)}
                className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 資格 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">保有資格</h3>
          <button
            onClick={addCertification}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            + 追加
          </button>
        </div>
        <div className="space-y-2">
          {data.certifications.map((cert, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={cert}
                onChange={(e) => updateCertification(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="基本情報技術者"
              />
              <button
                onClick={() => removeCertification(index)}
                className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 自己PR */}
      <div>
        <h3 className="text-lg font-bold mb-3">自己PR</h3>
        <textarea
          value={data.pr}
          onChange={(e) => updateField('pr', e.target.value)}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="自己PRを記載してください。"
        />
      </div>
    </div>
  );
};
