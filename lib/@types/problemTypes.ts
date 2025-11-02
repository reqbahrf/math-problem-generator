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
  // step_by_step_solution: string;
  difficulty_level: string;
  hint: string;
}

export interface ProblemHistory {
  id: string;
  problem_text: string;
  user_answer: string;
  feedback: string;
  is_correct: boolean;
  solution: string;
  created_at: string;
}
