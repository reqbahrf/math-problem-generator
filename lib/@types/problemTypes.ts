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

// export interface ProblemHistory {
//   id: string;
//   problem_text: string;
//   user_answer: string;
//   feedback: string;
//   is_correct: boolean;
//   solution: string;
//   created_at: string;
// }

export interface ProblemSessionConfigState {
  count: number;
  gradeLevel: number;
}
