export interface MathProblem {
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
  is_correct: boolean;
  solution: string;
  created_at: string;
}
