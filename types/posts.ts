export interface PostsResponse {
  data: Post[];
}

export interface Post {
  id: number;
  attributes: {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
}