import moment from "moment";
import parse from "html-react-parser";
import { prisma } from "../../../lib/prisma";
import type { Post } from "@prisma/client";

type Props = {
  params: { id: string };
};

export default async function Post({ params }: Props) {
  const post = await getPost(Number(params.id));
  return (
    <>
      <h1 className="text-5xl font-bold">{post?.title}</h1>
      <h2 className="pt-4 text-gray-400">
        {moment(post?.createdAt).format("MMMM DD, YYYY")}
      </h2>
      <article className="pt-8 prose prose-invert">
        {parse(post?.content as string)}
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

const getPost = async (id: number) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};
