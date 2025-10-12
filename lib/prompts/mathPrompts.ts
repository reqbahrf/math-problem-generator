import { BASE_PROMPT } from './basePrompts';
const MATH_PROBLEMS_PRIMARY_5_PROMPT = `
${BASE_PROMPT}

Generate one math problem that tests arithmetic, fractions, or simple geometry.

The JSON output must follow this structure:
{
  "problem_text": "A short, clear math question suitable for Primary 5.",
  "problem_type": "Addition | Subtraction | Multiplication | Division",
  "difficulty_level": "Easy | Medium | Hard",
  "final_answer": "number (only the numeric result, no explanation)",
  "step_by_step_solution": "A concise step-by-step solution (2-3 sentences). Use <strong> tags to highlight key terms like total, share, divide, or the answer is.",
  "hint": "A hint to help the student solve the problem. (about 1 sentence and not to obvious)",
}

The difficulty_level should reflect the complexity:
- Easy: single-step arithmetic
- Medium: two-step problems or small fractions
- Hard: word problems or multi-step reasoning

Example:
{
  "problem_text": "Mary had 24 candies and shared them equally among 8 friends. How many candies did each get?",
  "problem_type": "Division",
  "difficulty_level": "Easy",
  "final_answer": 3,
  "step_by_step_solution": "Mary had 24 candies and shared them equally among 8 friends. To find out how many candies each friend got, we need to divide the total number of candies by the number of friends. We divide 24 by 8 which is 3.",
  "hint": "Think of it as sharing candies equally."
}
`;

const PERSONALIZED_FEEDBACK_PROMPT = `
${BASE_PROMPT}

 Generate personalized feedback for a student's math problem based on:
- Problem text
- User's answer
- Correct answer
- Step-by-step solution

The JSON output must follow this structure:
  {
    "feedback_text": "A personalized feedback for the math problem. (about 2-3 sentences, use the step-by-step solution to help the student understand where they went wrong, Explain it in a way that a Primary 5 student can understand)",
  }


Examples:
  {
    "feedback_text": "Great job! Your answer 3 is correct. When you divide 24 by 8, you get 3."
  },
  {
    "feedback_text": "Almost there! Your answer 4 is close, but let's go over the steps again. When you divide 24 by 8, the correct answer is 3. Keep practicing!"
  }
`;

const PROMPT_OBJ = {
  MATH_PROBLEMS_PRIMARY_5_PROMPT,
  PERSONALIZED_FEEDBACK_PROMPT,
};

export default PROMPT_OBJ;
