import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabaseClient';
import PROMPT_OBJ from '@/lib/prompts/mathPrompts';
import { ERROR_MESSAGES } from '@/lib/constants/errorMessages';
import getModelOutput from '@/lib/Genai/googleAI';
// import mockProblems from '@/lib/constants/sampleProblemRes';

export async function POST(req: Request) {
  try {
    const { count, gradeLevel } = await req.json();
    const prompt = PROMPT_OBJ.generateMathProblemPrompt(gradeLevel, count);
    const result = await getModelOutput(prompt);
    // const result = mockProblems;
    const problems = Array.isArray(result) ? result : [result];
    console.log('problems', problems);
    if (
      (!Array.isArray(problems) || problems.length === 0) &&
      problems.length !== count
    ) {
      throw new Error(ERROR_MESSAGES.INVALID_AI_RESPONSE);
    }

    const { data, error } = await supabase
      .from('math_problem_sessions')
      .insert(
        problems.map((p) => ({
          problem_text: p.problemText,
          correct_answer: p.finalAnswer,
          problem_type: p.problemType,
          difficulty_level: p.difficultyLevel,
          step_by_step_solution: p.stepByStepSolution,
          hint: p.hint,
        }))
      )
      .select('id, problem_text, problem_type, difficulty_level, hint');

    if (error) throw error;

    const generatedProblems = data.map((p) => ({
      question_id: p.id,
      problemText: p.problem_text,
      problemType: p.problem_type,
      difficultyLevel: p.difficulty_level,
      hint: p.hint,
    }));

    return NextResponse.json({
      generatedProblems,
    });
  } catch (error) {
    console.log('Generate problem failed', error);
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.GENERATE_PROBLEM_FAILED,
      },
      { status: 500 }
    );
  }
}
