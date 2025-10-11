import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabaseClient';
import { MATH_PROBLEMS_PRIMARY_5_PROMPT } from '@/lib/prompts/mathPrompts';

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

    if (!json || !json.problem_text || !json.final_answer) {
      throw new Error('Invalid response format');
    }

    const { data, error } = await supabase
      .from('math_problem_sessions')
      .insert([
        {
          problem_text: json.problem_text,
          correct_answer: json.final_answer,
        },
      ])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({
      session_id: data.id,
      problem_text: json.problem_text,
      final_answer: json.final_answer,
    });
  } catch (error) {
    console.error('Error generating math problem:', error);
    return NextResponse.json(
      { error: 'Failed to generate math problem' },
      { status: 500 }
    );
  }
}
