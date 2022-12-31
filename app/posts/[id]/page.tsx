import moment from "moment";
import parse from "html-react-parser";
import { getPost, getPosts } from "../../../lib";

type Props = {
  params: { id: string };
};

export default async function Post({ params }: Props) {
  const post = await getPost(Number(params.id));
  return (
    <>
      <h1 className="sm:text-5xl text-4xl font-bold">{post?.title}</h1>
      <h2 className="pt-4 text-gray-400">
        {moment(post?.createdAt).format("MMMM DD, YYYY")}
      </h2>
      <article className="pt-8 prose prose-invert pb-16 prose-h1:text-2xl">
        {parse(post?.content as string)}
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
