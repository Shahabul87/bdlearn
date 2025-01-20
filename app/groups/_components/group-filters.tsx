"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Literature",
  "History",
  "Art",
  "Music",
  "Languages",
];

export const GroupFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const onCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/groups?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Categories
      </h3>
      <div className="space-y-3">
        {CATEGORIES.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={currentCategory === category}
              onCheckedChange={() => onCategoryChange(category)}
            />
            <label
              htmlFor={category}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
            >
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("category");
            router.push(`/groups?${params.toString()}`);
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}; 