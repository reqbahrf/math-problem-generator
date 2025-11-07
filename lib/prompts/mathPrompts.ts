import { basePrompt } from './basePrompts';
const generateMathProblemPrompt = (gradeLevel: number, count: number) => {
  return `
${basePrompt(gradeLevel)}

Generate ${count} math problem/s that tests arithmetic, fractions, or simple geometry.

The JSON output must follow this structure:
[
  {
  "problemText": "A short, clear math question suitable for Primary 5.",
  "problemType": "(Addition | Subtraction | Multiplication | Division) strictly output one of the four options don't include any other text",
  "difficultyLevel": "(Easy | Medium | Hard) strictly output one of the three options don't include any other text",
  "finalAnswer": "number (only the numeric result, no explanation, should always be a whole number do not include any decimal points or fractions)",
  "stepByStepSolution": "A concise step-by-step solution (2-3 sentences). Use <strong> tags to highlight key terms like total, share, divide, or the answer is.",
  "hint": "A hint to help the student solve the problem. (about 1 sentence and not to obvious)",
  }
]
The difficultyLevel should reflect the complexity:
- Easy: single-step arithmetic
- Medium: two-step problems or small fractions
- Hard: word problems or multi-step reasoning

Example:
[
  {
  "problemText": "Mary had 24 candies and shared them equally among 8 friends. How many candies did each get?",
  "problemType": "Division",
  "difficultyLevel": "Easy",
  "finalAnswer": 3,
  "stepByStepSolution": "Mary had 24 candies and shared them equally among 8 friends. To find out how many candies each friend got, we need to divide the total number of candies by the number of friends. We divide 24 by 8 which is 3.",
  "hint": "Think of it as sharing candies equally."
  }
]
`;
};

const generateFeedbackPrompt = (gradeLevel: number) => {
  return `
${basePrompt(gradeLevel)}

 Generate personalized feedback for a student's math problem based on:
- Problem text
- User's answer
- Correct answer
- Step-by-step solution

The JSON output must follow this structure:
  {
    "feedbackText": "A personalized feedback for the math problem. (about 2-3 sentences, use the step-by-step solution to help the student understand where they went wrong, Explain it in a way that a Primary 5 student can understand)",
  }


Examples:
  {
    "feedbackText": "Great job! Your answer 3 is correct. When you divide 24 by 8, you get 3."
  },
  {
    "feedbackText": "Almost there! Your answer 4 is close, but let's go over the steps again. When you divide 24 by 8, the correct answer is 3. Keep practicing!"
  }
`;
};

const PROMPT_OBJ = {
  generateMathProblemPrompt,
  generateFeedbackPrompt,
};

export default PROMPT_OBJ;
