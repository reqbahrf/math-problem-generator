import { LocalSession } from '@/lib/sessionStorage';

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

self.onmessage = (e: MessageEvent<LocalSession[]>) => {
  const sessions = e.data;
  const categories = ['Addition', 'Subtraction', 'Multiplication', 'Division'];
  const difficultyCategories = ['Easy', 'Medium', 'Hard'];
  const result = sessions.map((session) => {
    const numberOfAnsweredQuestions = session.problems.filter(
      (p) => p.userAnswer !== null
    ).length;
    const problemTypeCounts = session.problems.reduce((counts, problem) => {
      if (problem.problemType) {
        counts[problem.problemType] = counts[problem.problemType] + 1 || 1;
      }
      return counts;
    }, {} as Record<string, number>);

    const difficultyCounts = session.problems.reduce((counts, problem) => {
      if (problem.difficultyLevel) {
        counts[problem.difficultyLevel] =
          counts[problem.difficultyLevel] + 1 || 1;
      }
      return counts;
    }, {} as Record<string, number>);

    return {
      session: { ...session },
      numberOfAnsweredQuestions,
      problemTypeCounts,
      problemCount: session.problems.length,
      problemTypeSeries: categories.map((type) => problemTypeCounts[type] || 0),
      difficultyCounts,
      difficultySeries: difficultyCategories.map(
        (type) => difficultyCounts[type] || 0
      ),
      categories,
      difficultyCategories,
    };
  });

  self.postMessage(result);
};

export {};
