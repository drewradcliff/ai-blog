import Link from "next/link";
import moment from "moment";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="pt-4 text-gray-400">
        This blog is generated from AI using Elon's tweets.
      </p>
      <div className="pt-8">
        {posts.map((post) => (
          <Link href={"/posts/" + post.id}>
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold max-w-lg">{post.title}</h2>
              <div className="text-gray-400">
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
