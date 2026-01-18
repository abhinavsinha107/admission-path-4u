"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BlogForm } from "./blog-form";
import { Plus, Pencil, Trash } from "lucide-react";
import { deleteBlog } from "@/app/actions/blog";
import { IBlog } from "@/models/Blog";

export function BlogManager({ initialBlogs }: { initialBlogs: any[] }) {
  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);

  const handleAdd = () => {
    setEditingBlog(null);
    setOpen(true);
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Blogs</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Blog
        </Button>
      </div>

      <div className="border rounded-md bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialBlogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  No blogs found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              initialBlogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(blog)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="overflow-y-auto sm:max-w-xl w-full px-8"
        >
          <SheetHeader>
            <SheetTitle>
              {editingBlog ? "Edit Blog" : "Add New Blog"}
            </SheetTitle>
            <SheetDescription>
              {editingBlog
                ? "Make changes to the blog post here."
                : "Fill in the details for the new blog post."}
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <BlogForm blog={editingBlog} onSuccess={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
