"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Shield, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { InviteMemberDialog } from "./invite-member-dialog";
import { cn } from "@/lib/utils";

interface MembersProps {
  group: any;
  currentUser: any;
  isGroupMember: boolean;
}

export const Members = ({ group, currentUser, isGroupMember }: MembersProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isAdmin = group.members.some(
    (member: any) => member.userId === currentUser.id && member.role === "admin"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Members ({group.members.length})
        </h2>
        {isAdmin && (
          <Button
            onClick={() => setIsDialogOpen(true)}
            className={cn(
              "bg-purple-600 hover:bg-purple-700",
              "text-white",
              "shadow-lg shadow-purple-600/20"
            )}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {group.members.map((member: any) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={member.user.image} />
                <AvatarFallback>
                  {member.user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {member.user.name}
                  {member.userId === group.creatorId && (
                    <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                      Creator
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {member.role}
                </p>
              </div>
            </div>

            {isAdmin && member.userId !== currentUser.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Make Moderator
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </div>

      <InviteMemberDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        groupId={group.id}
      />
    </motion.div>
  );
}; 