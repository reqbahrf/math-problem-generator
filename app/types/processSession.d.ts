import type { LocalSession } from '@/lib/sessionStorage';
export interface ProcessedSession {
  session: LocalSession;
  numberOfAnsweredQuestions: number;
  problemTypeCounts: Record<string, number>;
  problemCount: number;
  problemTypeSeries: number[];
  difficultyCounts: Record<string, number>;
  difficultySeries: number[];
  categories: string[];
  difficultyCategories: string[];
}
