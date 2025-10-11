import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { session_id, user_answer } = await req.json();

    if (!session_id || !user_answer) {
      throw new Error('Session ID and user answer are required');
    }

    const { data: session, error: sessionError } = await supabase
      .from('math_problem_sessions')
      .select('correct_answer')
      .eq('id', session_id)
      .single();

    if (sessionError || !session) {
      throw new Error('Session not found');
    }

    const isCorrect = Number(user_answer) === Number(session.correct_answer);

    const feedback = isCorrect
      ? 'Great job! Your answer is correct. 🎉'
      : `Not quite right. The correct answer was ${session.correct_answer}.`;

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
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
