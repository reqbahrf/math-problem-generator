import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabaseClient';
import { MATH_PROBLEMS_PRIMARY_5_PROMPT } from '@/lib/prompts/mathPrompts';
import { ERROR_MESSAGES } from '@/lib/constants/errorMessages';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });
    const result = await model.generateContent(MATH_PROBLEMS_PRIMARY_5_PROMPT);
    const text = result.response.text().trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const json = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (
      !json ||
      !json.problem_text ||
      !json.final_answer ||
      !json.problem_type ||
      !json.difficulty_level ||
      !json.step_by_step_solution ||
      !json.hint
    ) {
      throw new Error(ERROR_MESSAGES.INVALID_AI_RESPONSE);
    }

    const { data, error } = await supabase
      .from('math_problem_sessions')
      .insert([
        {
          problem_text: json.problem_text,
          correct_answer: json.final_answer,
          problem_type: json.problem_type,
          difficulty_level: json.difficulty_level,
          step_by_step_solution: json.step_by_step_solution,
          hint: json.hint,
        },
      ])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({
      session_id: data.id,
      problem_text: json.problem_text,
      problem_type: json.problem_type,
      difficulty_level: json.difficulty_level,
      step_by_step_solution: json.step_by_step_solution,
      hint: json.hint,
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
