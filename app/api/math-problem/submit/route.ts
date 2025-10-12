import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { ERROR_MESSAGES } from '@/lib/constants/errorMessages';
import { formatDate } from '@/lib/formatDate';
import { buildFeedbackPrompt } from '@/lib/buildFeedbackPrompt';
import PROMPT_OBJ from '@/lib/prompts/mathPrompts';
import getModelOutput from '@/lib/Genai/googleAI';

export async function POST(req: Request) {
  try {
    const { session_id, user_answer } = await req.json();

    if (!session_id || !user_answer) {
      throw new Error(ERROR_MESSAGES.INVALID_SUBMITTED_BODY);
    }

    const { data: session, error: sessionError } = await supabase
      .from('math_problem_sessions')
      .select('problem_text, correct_answer, step_by_step_solution, created_at')
      .eq('id', session_id)
      .single();

    if (sessionError || !session) {
      throw new Error(
        sessionError?.message || ERROR_MESSAGES.INVALID_SUBMITTED_BODY
      );
    }

    const isCorrect = Number(user_answer) === Number(session.correct_answer);

    const feedback = await getModelOutput(
      buildFeedbackPrompt(PROMPT_OBJ.PERSONALIZED_FEEDBACK_PROMPT, {
        problem_text: session.problem_text,
        user_answer,
        correct_answer: session.correct_answer,
        step_by_step_solution: session.step_by_step_solution,
      })
    );

    const { error: insertError } = await supabase
      .from('math_problem_submissions')
      .insert([
        {
          session_id,
          user_answer,
          is_correct: isCorrect,
          feedback_text: feedback.feedback_text,
        },
      ]);

    if (insertError) throw insertError;

    if (!feedback.feedback_text)
      throw new Error(ERROR_MESSAGES.INVALID_AI_RESPONSE);
    return NextResponse.json({
      is_correct: isCorrect,
      feedback_text: feedback.feedback_text,
      solution: session.step_by_step_solution,
      created_at: formatDate(session.created_at),
    });
  } catch (error) {
    console.log('Error on answer submission', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SUBMIT_ANSWER_FAILED },
      { status: 500 }
    );
  }
}
