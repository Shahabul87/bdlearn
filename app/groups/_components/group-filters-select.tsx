"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  "All Categories",
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

export function GroupFiltersSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "All Categories";

  const onValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All Categories") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`/groups?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={currentCategory}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORIES.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 