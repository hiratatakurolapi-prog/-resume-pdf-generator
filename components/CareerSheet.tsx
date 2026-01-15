import React from 'react';
import { CareerData } from '@/types';

interface CareerSheetProps {
  data: CareerData;
}

export const CareerSheet: React.FC<CareerSheetProps> = ({ data }) => {
  return (
    <div className="pdf-preview font-sans">
      {/* ヘッダー */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-center">職務経歴書</h1>
        <div className="flex justify-between items-end">
          <p className="text-sm text-gray-600">
            {new Date().toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}現在
          </p>
          <p className="text-right">氏名: <span className="font-bold text-lg">{data.name || '　'}</span></p>
        </div>
      </div>

      {/* 職務要約 */}
      {data.summary && (
        <div className="mb-6 avoid-break">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b-2 border-gray-800">
            職務要約
          </h2>
          <p className="preserve-linebreaks text-sm leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}

      {/* 職務経歴詳細 */}
      {data.experiences && data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b-2 border-gray-800">
            職務経歴
          </h2>
          {data.experiences.map((exp, index) => (
            <div key={index} className="mb-6 avoid-break">
              <div className="bg-gray-100 px-3 py-2 mb-2 border-l-4 border-gray-800">
                <p className="font-bold text-base">{exp.company || '　'}</p>
                <p className="text-sm text-gray-600">{exp.period || '　'}</p>
              </div>
              <div className="px-3">
                {exp.position && (
                  <p className="font-medium mb-2">【{exp.position}】</p>
                )}
                {exp.description && (
                  <p className="preserve-linebreaks text-sm mb-3 leading-relaxed">
                    {exp.description}
                  </p>
                )}
                {exp.achievements && exp.achievements.length > 0 && exp.achievements.some(a => a.trim()) && (
                  <>
                    <p className="font-medium mb-1 text-sm">主な実績・成果:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                      {exp.achievements.filter(a => a.trim()).map((achievement, i) => (
                        <li key={i} className="preserve-linebreaks">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 活かせる経験・スキル */}
      {data.skills && data.skills.length > 0 && data.skills.some(s => s.trim()) && (
        <div className="mb-6 avoid-break">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b-2 border-gray-800">
            活かせる経験・スキル
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1 ml-2">
            {data.skills.filter(s => s.trim()).map((skill, index) => (
              <li key={index} className="preserve-linebreaks">{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 保有資格 */}
      {data.certifications && data.certifications.length > 0 && data.certifications.some(c => c.trim()) && (
        <div className="mb-6 avoid-break">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b-2 border-gray-800">
            保有資格
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1 ml-2">
            {data.certifications.filter(c => c.trim()).map((cert, index) => (
              <li key={index} className="preserve-linebreaks">{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 自己PR */}
      {data.pr && (
        <div className="avoid-break">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b-2 border-gray-800">
            自己PR
          </h2>
          <p className="preserve-linebreaks text-sm leading-relaxed">
            {data.pr}
          </p>
        </div>
      )}
    </div>
  );
};
