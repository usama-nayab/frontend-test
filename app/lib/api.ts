import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = () => api.get("/posts").then((res) => res.data);
export const getPost = (id: string) =>
  api.get(`/posts/${id}`).then((res) => res.data);
export const createPost = (post: { title: string; body: string }) =>
  api.post("/posts", post).then((res) => res.data);export async function updatePost(post: { id: number; title: string; body: string }) {
  const res = await axios.put(`/api/posts/${post.id}`, post);
  return res.data;
}
export const deletePost = (id: number) =>
  api.delete(`/posts/${id}`).then((res) => res.data);
