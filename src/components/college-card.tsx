import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function CollegeCard({ college }: { college: any }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow py-0! gap-0!">
      <div className="h-48 w-full bg-gray-200 relative shrink-0">
        {college.images?.[0] ? (
          <img
            src={college.images[0]}
            alt={college.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <h3 className="font-bold text-lg line-clamp-1">{college.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="mr-1 h-3 w-3" />
          {college.city}, {college.state}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <div className="text-sm">
          <span className="font-medium">Courses:</span>{" "}
          {college.courses.slice(0, 3).join(", ")}
          {college.courses.length > 3 && "..."}
        </div>
        <div className="text-sm mt-1">
          <span className="font-medium">Fees:</span> ₹{college.fees}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/colleges/${college.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
