import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { twitterClient } from "../../lib/twitter";
import { openai } from "../../lib/openai";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await twitterClient.tweets.usersIdTweets("44196397", {
      exclude: ["replies", "retweets"],
      start_time: moment().subtract(1, "day").format(),
      max_results: 100,
      "tweet.fields": ["public_metrics"],
    });

    if (data) {
      const topTweet = data?.reduce((prev, curr) =>
        prev.public_metrics!.like_count > curr.public_metrics!.like_count
          ? prev
          : curr
      );

      const { data: openAiData } = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Write a blog post in html about '${topTweet?.text}' as if it was written by Elon Musk`,
        max_tokens: 2000,
        temperature: 0,
      });
      await prisma.post.create({
        data: {
          title: topTweet.text,
          content: openAiData.choices[0].text ?? "",
          tweetUrl: "https://twitter.com/elonmusk/status/" + topTweet.id,
        },
      });
      res.status(200).json(openAiData);
    } else {
      return res.status(400).json("No tweets available today");
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
