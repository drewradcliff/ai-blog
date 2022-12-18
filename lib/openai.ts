import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-TDG8rvzENQpkJ1sk12XqvJ6K",
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
