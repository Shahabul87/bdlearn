"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Discussions } from "./discussions";
import { Resources } from "./resources";
import { Members } from "./members";
import { Events } from "./events";
import { cn } from "@/lib/utils";

interface GroupContentProps {
  group: any;
  currentUser: any;
  isGroupMember: boolean;
}

export const GroupContent = ({ group, currentUser, isGroupMember }: GroupContentProps) => {
  const [activeTab, setActiveTab] = useState("discussions");

  return (
    <Tabs
      defaultValue="discussions"
      className="mt-8"
      onValueChange={setActiveTab}
    >
      <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
        {["discussions", "resources", "members", "events"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              "data-[state=active]:bg-purple-600 data-[state=active]:text-white",
              "capitalize"
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="discussions">
        <Discussions 
          group={group}
          currentUser={currentUser}
          isGroupMember={isGroupMember}
        />
      </TabsContent>

      <TabsContent value="resources">
        <Resources 
          group={group}
          currentUser={currentUser}
          isGroupMember={isGroupMember}
        />
      </TabsContent>

      <TabsContent value="members">
        <Members 
          group={group}
          currentUser={currentUser}
          isGroupMember={isGroupMember}
        />
      </TabsContent>

      <TabsContent value="events">
        <Events 
          group={group}
          currentUser={currentUser}
          isGroupMember={isGroupMember}
        />
      </TabsContent>
    </Tabs>
  );
}; 