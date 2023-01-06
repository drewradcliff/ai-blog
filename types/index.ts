export type Post = {
  id: number;
  tweetUrl: string;
  title: string;
  content: string;
  createdAt: Date;
  Image: Image;
};

type Image = {
  id: number;
  fileName: string;
  postId: number;
};
