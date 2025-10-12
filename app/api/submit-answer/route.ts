import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { ERROR_MESSAGES } from '@/lib/constants/errorMessages';
import { formatDate } from '@/lib/formatDate';

export async function POST(req: Request) {
  try {
    const { session_id, user_answer } = await req.json();

    if (!session_id || !user_answer) {
      throw new Error(ERROR_MESSAGES.INVALID_SUBMITTED_BODY);
    }

    const { data: session, error: sessionError } = await supabase
      .from('math_problem_sessions')
      .select('correct_answer, step_by_step_solution, created_at')
      .eq('id', session_id)
      .single();

    if (sessionError || !session) {
      throw new Error(
        sessionError?.message || ERROR_MESSAGES.INVALID_SUBMITTED_BODY
      );
    }

    const isCorrect = Number(user_answer) === Number(session.correct_answer);

    const feedback = isCorrect
      ? `Great job! Your answer is correct. 🎉 ${session.step_by_step_solution}`
      : `Not quite right. Here's the step-by-step solution: ${session.step_by_step_solution}`;

    const { error: insertError } = await supabase
      .from('math_problem_submissions')
      .insert([
        {
          session_id,
          user_answer,
          is_correct: isCorrect,
          feedback_text: feedback,
        },
      ]);

    if (insertError) throw insertError;

    return NextResponse.json({
      is_correct: isCorrect,
      feedback_text: feedback,
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
