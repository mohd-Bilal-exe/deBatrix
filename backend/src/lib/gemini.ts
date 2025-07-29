import { GoogleGenerativeAI } from '@google/genai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateDebateResponse(
  role: 'FOR' | 'AGAINST',
  topic: string,
  mood: string,
  personality: string,
  previousMessages: { role: string; content: string }[]
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    You are participating in a debate ${role === 'FOR' ? 'supporting' : 'opposing'} the topic: "${topic}".
    Your personality type is: ${personality}
    The debate mood is: ${mood}
    
    Previous messages in the debate:
    ${previousMessages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n')}
    
    Provide a compelling and creative argument maintaining your assigned role and personality.
    Keep your response concise but impactful.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
