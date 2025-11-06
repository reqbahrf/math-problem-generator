import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { ERROR_MESSAGES } from '@/lib/constants/errorMessages';
import { formatDate } from '@/lib/formatDate';
import { buildFeedbackPrompt } from '@/lib/buildFeedbackPrompt';
import PROMPT_OBJ from '@/lib/prompts/mathPrompts';
import getModelOutput from '@/lib/Genai/googleAI';
import { GeneratedFeedback } from '@/lib/@types/feedbackTypes';

export async function POST(req: Request) {
  try {
    const { question_id, user_answer, gradeLevel } = await req.json();

    if (!question_id || !user_answer) {
      throw new Error(ERROR_MESSAGES.INVALID_SUBMITTED_BODY);
    }

    const { data: session, error: sessionError } = await supabase
      .from('math_problem_sessions')
      .select('problem_text, correct_answer, step_by_step_solution, created_at')
      .eq('id', question_id)
      .single();

    if (sessionError || !session) {
      throw new Error(
        sessionError?.message || ERROR_MESSAGES.INVALID_SUBMITTED_BODY
      );
    }

    const isCorrect = Number(user_answer) === Number(session.correct_answer);

    const feedback = await getModelOutput<GeneratedFeedback>(
      buildFeedbackPrompt(PROMPT_OBJ.generateFeedbackPrompt(gradeLevel), {
        problemText: session.problem_text,
        user_answer,
        correct_answer: session.correct_answer,
        stepByStepSolution: session.step_by_step_solution,
      })
    );

    const { error: insertError } = await supabase
      .from('math_problem_submissions')
      .insert([
        {
          session_id: question_id,
          user_answer,
          is_correct: isCorrect,
          feedback_text: feedback.feedbackText,
        },
      ]);

    if (insertError) throw insertError;

    if (!feedback.feedbackText)
      throw new Error(ERROR_MESSAGES.INVALID_AI_RESPONSE);
    return NextResponse.json({
      isCorrect: isCorrect,
      feedbackText: feedback.feedbackText,
      solution: session.step_by_step_solution,
      createdAt: formatDate(session.created_at),
    });
  } catch (error) {
    console.log('Error on answer submission', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SUBMIT_ANSWER_FAILED },
      { status: 500 }
    );
  }
}
