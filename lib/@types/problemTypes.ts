export interface GeneratedMathProblem {
  problem_text: string;
  final_answer: string;
  problem_type: string;
  difficulty_level: string;
  step_by_step_solution: string;
  hint: string;
}

export interface MathProblem {
  question_id: string;
  problem_text: string;
  problem_type: string;
  difficulty_level: string;
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

export interface ProblemHistory {
  id: string;
  problemText: string;
  userAnswer: string | null;
  feedback: string | null;
  isCorrect: boolean | null;
  solution: string | null;
  createdAt: string | null;
}

export interface ProblemSessionConfigState {
  count: number;
  gradeLevel: number;
}
