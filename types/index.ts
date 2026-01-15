// 履歴書データ型
export interface ResumeData {
  name: string;
  kana: string;
  birthDate: string;
  gender: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  education: EducationItem[];
  workHistory: WorkHistoryItem[];
  qualifications: QualificationItem[];
}

export interface EducationItem {
  date: string;
  content: string;
}

export interface WorkHistoryItem {
  date: string;
  content: string;
}

export interface QualificationItem {
  date: string;
  content: string;
}

// 職務経歴書データ型
export interface CareerData {
  name: string;
  summary: string;
  experiences: ExperienceItem[];
  skills: string[];
  certifications: string[];
  pr: string;
}

export interface ExperienceItem {
  period: string;
  company: string;
  position: string;
  description: string;
  achievements: string[];
}
