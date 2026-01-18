import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { BlogManager } from "./blog-manager";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  const serializedBlogs = JSON.parse(JSON.stringify(blogs));

  return <BlogManager initialBlogs={serializedBlogs} />;
}
