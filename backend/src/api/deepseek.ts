// Install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

const AI = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY, // Ensure you have set this in your environment variables
});

export default AI;