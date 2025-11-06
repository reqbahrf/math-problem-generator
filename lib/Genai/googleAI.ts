import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getModelOutput = async <T = Record<string, any>>(
  prompt: string
): Promise<T> => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const jsonMatch = text.match(/(\[.*\]|\{.*\})/s);
    if (!jsonMatch) throw new Error('No valid JSON found in AI response');

    const parsed = JSON.parse(jsonMatch[1]);

    return parsed;
  } catch (error) {
    console.log('Error getting model output', error);
    throw error;
  }
};

export default getModelOutput;
