export interface GeneratedMathProblem {
  problemText: string;
  finalAnswer: string;
  problemType: 'Addition' | 'Subtraction' | 'Multiplication' | 'Division';
  difficultyLevel: 'Easy' | 'Medium' | 'Hard';
  stepByStepSolution: string;
  hint: string;
}

export interface MathProblem {
  question_id: string;
  problemText: string;
  problemType: GeneratedMathProblem['problemType'];
  difficultyLevel: GeneratedMathProblem['difficultyLevel'];
  hint: string;
}

export interface MathProblemState extends MathProblem {
  isAnswered: boolean | null;
  userAnswer: string | null;
  isCorrect: boolean | null;
  feedback: string | null;
  solution: string | null;
  createdAt: string | null;
}

export interface ProblemSession {
  questionId: string;
  problemText: string;
  problemType: MathProblem['problemType'];
  difficultyLevel: MathProblem['difficultyLevel'];
  hint?: string | null;
  userAnswer?: string | null;
  isCorrect?: boolean | null;
  feedback?: string | null;
  solution?: string | null;
  createdAt?: string | null;
}

export interface ProblemSessionConfigState {
  count: number;
  gradeLevel: number;
}
