import type { NextApiRequest, NextApiResponse } from "next";
import { twitterClient } from "../../lib/twitter";
import moment from "moment";
import { openai } from "../../lib/openai";
import { CreateCompletionResponse } from "openai";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateCompletionResponse | string>
) {
  const { data } = await twitterClient.tweets.usersIdTweets("44196397", {
    exclude: ["replies", "retweets"],
    start_time: moment().subtract(1, "day").format(),
    max_results: 100,
    "tweet.fields": ["public_metrics"],
  });

  if (data) {
    const topTweet = data.reduce((prev, curr) =>
      prev.public_metrics!.like_count > curr.public_metrics!.like_count
        ? prev
        : curr
    );

    const { data: openAiData } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a blog post about '${topTweet.text}' as if it was written by Elon Musk`,
      max_tokens: 2000,
      temperature: 0,
    });

    if (openAiData) {
      await prisma.post.create({
        data: {
          content: openAiData.choices[0].text ?? "",
        },
      });
      res.status(200).json(openAiData);
    } else {
      res.status(400).json("Error: No openai data");
    }
  } else {
    res.status(400).json("Error: No twitter data");
  }
}
