import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function BlogCard({ blog }: { blog: any }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={blog.main_image}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {blog.excerpt}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-auto">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/blogs/${blog.slug}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
