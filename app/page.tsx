import Link from "next/link";
import moment from "moment";
import { prisma } from "../lib/prisma";
import type { Post } from "@prisma/client";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="pt-4 text-gray-400">
        This blog is generated from AI using Elon's tweets.
      </p>
      <div className="pt-8">
        {posts.map((post: Post) => (
          <Link href={"/posts/" + post.id}>
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold sm:max-w-xl">
                {post.title}
              </h2>
              <div className="text-gray-400 whitespace-nowrap">
                {moment(post.createdAt).format("MMM Do YY")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

const getPosts = async () => {
  return await prisma.post.findMany();
};
