import type { LocalSession } from '@/lib/sessionStorage';

self.onmessage = (e: MessageEvent<LocalSession[]>) => {
  const sessions = e.data;
  const categories = ['Addition', 'Subtraction', 'Multiplication', 'Division'];
  const difficultyCategories = ['Easy', 'Medium', 'Hard'];
  const result = sessions.map((session) => {
    let numberOfAnsweredQuestions = 0;
    const problemTypeCounts: Record<string, number> = {};
    const difficultyCounts: Record<string, number> = {};

    for (const problem of session.problems) {
      if (problem.userAnswer !== null) {
        numberOfAnsweredQuestions++;
      }

      if (problem.problemType) {
        problemTypeCounts[problem.problemType] =
          (problemTypeCounts[problem.problemType] || 0) + 1;
      }

      if (problem.difficultyLevel) {
        difficultyCounts[problem.difficultyLevel] =
          (difficultyCounts[problem.difficultyLevel] || 0) + 1;
      }
    }
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
