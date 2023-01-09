import { Post } from "../types";

export const getPost = async (id: number) => {
  const res = await fetch(`${process.env.AI_BLOG_API_URL!}/post/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_KEY}`,
    },
  });
  const post: Post = await res.json();
  return post;
};

export const getPosts = async () => {
  const res = await fetch(process.env.AI_BLOG_API_URL! + "/posts", {
    next: {
      revalidate: 86400,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_KEY}`,
    },
  });
  const posts: Post[] = await res.json();
  return posts;
};
