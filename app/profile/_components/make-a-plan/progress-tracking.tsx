"use client";

import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProgressTracking = () => {
  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-purple-500" />
          Current Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Active Plans</h4>
              <p className="text-sm text-muted-foreground">Your ongoing learning journeys</p>
            </div>
            <Button 
              variant="outline" 
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 border-purple-200 dark:border-purple-500/20 hover:bg-purple-50 dark:hover:bg-purple-500/10"
            >
              View All
            </Button>
          </div>
          
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground text-center">
              No active plans yet. Create one to get started!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 