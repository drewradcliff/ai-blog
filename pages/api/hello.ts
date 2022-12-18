import { openai } from "../../lib/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CreateCompletionResponse } from "openai";

type Data = {
  data: CreateCompletionResponse;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Write a blog post about this: 'https://t.co/94I61oMYFs'",
    max_tokens: 2000,
    temperature: 0,
  });

  res.status(200).json({ data });
}
