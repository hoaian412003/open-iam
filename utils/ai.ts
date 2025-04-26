import OpenAI from "openai";
import z from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

const apiKey = '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';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey
});

function cleanJsonResponse(raw: string): string {
  return raw
    .replace(/```json\s*/g, '')  // Remove starting ```json
    .replace(/```/g, '')         // Remove ending ```
    .trim();                     // Remove any leading/trailing spaces
}

export const ask = async <T extends z.ZodRawShape>(message: string, formatter: z.ZodObject<T>) => {

  // const system_prompt = `
  //   Format the answer base on this:
  //   JSON:
  //   ${JSON.stringify(formatter)}
  //   No extra text. No markdown. Only valid JSON.
  // `

  const system_prompt = `
    You must respond ONLY in this strict JSON format:
    JSON:
    {
      "results": ["id", "name"]
    }
    No extra text. No markdown. Only valid JSON.
  `

  const completion = await openai.beta.chat.completions.parse({
    messages: [
      { role: "system", content: system_prompt },
      { role: "user", content: message }
    ],
    model: "shisa-ai/shisa-v2-llama3.3-70b:free",
    response_format: {
      'type': 'json_object'
    },
  });
  const result = completion.choices[0].message;
  const formattedResult = cleanJsonResponse(result.content || "");
  return JSON.parse(formattedResult);
}
