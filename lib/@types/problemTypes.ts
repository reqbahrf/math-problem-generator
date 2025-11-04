export interface GeneratedMathProblem {
  problem_text: string;
  final_answer: string;
  problem_type: 'Addition' | 'Subtraction' | 'Multiplication' | 'Division';
  difficulty_level: 'Easy' | 'Medium' | 'Hard';
  step_by_step_solution: string;
  hint: string;
}

export interface MathProblem {
  question_id: string;
  problem_text: string;
  problem_type: GeneratedMathProblem['problem_type'];
  difficulty_level: GeneratedMathProblem['difficulty_level'];
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
  problemType: MathProblem['problem_type'];
  difficultyLevel: MathProblem['difficulty_level'];
  hint: string;
  userAnswer: string;
  isCorrect: boolean;
  feedback: string;
  solution: string;
  createdAt: string;
}

export interface ProblemSessionConfigState {
  count: number;
  gradeLevel: number;
}
