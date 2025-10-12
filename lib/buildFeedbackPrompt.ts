export const buildFeedbackPrompt = (
  basePrompt: string,
  problem: {
    problem_text: string;
    user_answer: string;
    correct_answer: string;
    step_by_step_solution: string;
  }
) => {
  return `
  ${basePrompt}

  Here is the problem data to base your feedback on:
{
    Problem: ${problem.problem_text}
    User's Answer: ${problem.user_answer}
    Correct Answer: ${problem.correct_answer}
    Step-by-Step Solution: ${problem.step_by_step_solution}
}`;
};
