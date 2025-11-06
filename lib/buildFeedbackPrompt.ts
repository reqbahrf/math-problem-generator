export const buildFeedbackPrompt = (
  basePrompt: string,
  problem: {
    problemText: string;
    user_answer: string;
    correct_answer: string;
    stepByStepSolution: string;
  }
) => {
  return `
  ${basePrompt}

  Here is the problem data to base your feedback on:
{
    Problem: ${problem.problemText}
    User's Answer: ${problem.user_answer}
    Correct Answer: ${problem.correct_answer}
    Step-by-Step Solution: ${problem.stepByStepSolution}
}`;
};
