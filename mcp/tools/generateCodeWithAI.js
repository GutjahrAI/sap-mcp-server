import { z } from "zod";
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateCodeWithAI = {
  schema: {
    description: z.string(),
    language: z.string().optional()  // default to "plaintext"
  },
  handler: async ({ description }) => {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment.");
    }
    const language = "ABAP"
    const prompt = `
You are an expert SAP ABAP developer. Write clean, documented ABAP code with proper authorization checks, error handling, and performance considerations. Follow SAP naming conventions and best practices.:
"${description}"

Use clear, concise, and documented code.
${language ? `Language: ${language}` : ""}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful programming assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    });

    const generatedCode = completion.choices[0].message.content.trim();

    return {
      content: [
        { type: "code", language: language || "plaintext", text: generatedCode }
      ]
    };
  }
};
