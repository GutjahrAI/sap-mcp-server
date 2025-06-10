import { z } from "zod";
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateAbapFunction = {
  schema: {
    description: z.string()
  },
  handler: async ({ description }) => {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment.");
    }

    const prompt = `
You are an expert SAP developer. Generate an ABAP function module template based on the following description:
"${description}"

Use best practices for naming and structure, and include short comments.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful SAP developer assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    });

    const abapCode = completion.choices[0].message.content.trim();

    return {
      content: [
        { type: "code", language: "abap", text: abapCode }
      ]
    };
  }
};
