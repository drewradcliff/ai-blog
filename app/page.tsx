import Link from "next/link";
import moment from "moment";
import { getPosts } from "../lib";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="pt-4 text-gray-400">
        This blog is generated by AI using Elon&apos;s tweets.
      </p>
      <div className="py-8">
        {posts.map((post) => (
          <Link key={post.id} href={"/posts/" + post.id}>
            <div className="flex justify-between pt-8 gap-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="text-gray-400 whitespace-nowrap">
                {moment(post.createdAt).local().format("MMM Do YY")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
