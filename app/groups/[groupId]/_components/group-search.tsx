"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from 'next/image';

interface GroupSearchProps {
  group: any;
}

export const GroupSearch = ({ group }: GroupSearchProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Search className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Search discussions, resources, and events...
        </span>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search group content..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Discussions">
            {/* Map through discussions */}
          </CommandGroup>
          <CommandGroup heading="Resources">
            {/* Map through resources */}
          </CommandGroup>
          <CommandGroup heading="Events">
            {/* Map through events */}
          </CommandGroup>
          <CommandGroup heading="Members">
            {group.members.map((member: any) => (
              <CommandItem
                key={member.id}
                value={member.user.name}
                className="flex items-center gap-2"
              >
                <Image 
                  src={member.user.image || "/placeholder.png"}
                  alt={member.user.name || "Search result"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>{member.user.name}</span>
                <span className="text-xs text-gray-500">
                  {member.role}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}; 