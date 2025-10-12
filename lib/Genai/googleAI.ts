import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getModelOutput = async (
  prompt: string
): Promise<{ [key: string]: any }> => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const json = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    return json;
  } catch (error) {
    console.log('Error getting model output', error);
    return null;
  }
};

export default getModelOutput;
