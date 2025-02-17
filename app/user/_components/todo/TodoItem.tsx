import { format } from "date-fns";
import { Trash2, CheckCircle, Circle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: "LOW" | "MEDIUM" | "HIGH";
    status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  };
  onStatusChange: (id: string, status: "TODO" | "IN_PROGRESS" | "COMPLETED") => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  LOW: "text-blue-500",
  MEDIUM: "text-yellow-500",
  HIGH: "text-red-500"
};

export const TodoItem = ({ todo, onStatusChange, onDelete }: TodoItemProps) => {
  return (
    <Card className={cn(
      "transition-all duration-200",
      todo.status === "COMPLETED" && "opacity-60"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => onStatusChange(todo.id, 
                todo.status === "COMPLETED" ? "TODO" : "COMPLETED"
              )}
              className="mt-1"
            >
              {todo.status === "COMPLETED" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            <div className="space-y-1">
              <h3 className={cn(
                "font-medium",
                todo.status === "COMPLETED" && "line-through"
              )}>
                {todo.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {todo.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{format(todo.dueDate, 'PPp')}</span>
                <span className={cn(
                  "font-medium",
                  priorityColors[todo.priority]
                )}>
                  {todo.priority}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onDelete(todo.id)}
            className="text-destructive hover:text-destructive/80 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}; 