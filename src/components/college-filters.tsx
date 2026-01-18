"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebouncedCallback } from "use-debounce";

export function CollegeFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string, key: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(key, term);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Filters</h3>
      <div className="space-y-2">
        <Label>Search Name</Label>
        <Input
          placeholder="Search colleges..."
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value, "search")}
        />
      </div>
      <div className="space-y-2">
        <Label>State</Label>
        <Input
          placeholder="e.g. Maharashtra"
          defaultValue={searchParams.get("state")?.toString()}
          onChange={(e) => handleSearch(e.target.value, "state")}
        />
      </div>
      <div className="space-y-2">
        <Label>City</Label>
        <Input
          placeholder="e.g. Mumbai"
          defaultValue={searchParams.get("city")?.toString()}
          onChange={(e) => handleSearch(e.target.value, "city")}
        />
      </div>
      <div className="space-y-2">
        <Label>Course</Label>
        <Input
          placeholder="e.g. B.Tech"
          defaultValue={searchParams.get("course")?.toString()}
          onChange={(e) => handleSearch(e.target.value, "course")}
        />
      </div>
    </div>
  );
}
