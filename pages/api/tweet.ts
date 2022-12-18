import type { NextApiRequest, NextApiResponse } from "next";
import { twitterClient } from "../../lib/twitter";

// type Data = {
//   data: CreateCompletionResponse;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const response = await twitterClient.users.findUsersByUsername({
  //   usernames: ["elonmusk"],
  // });

  const response = await twitterClient.tweets.usersIdTweets("44196397", {
    exclude: ["replies", "retweets"],
  });

  // if (response.errors) {
  //   res.status(400).json({ error: response.errors });
  // }
  res.status(200).json({ response });
}
