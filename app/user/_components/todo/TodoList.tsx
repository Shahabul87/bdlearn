"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { Clock } from "./Clock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  createdAt: Date;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredTodos = todos.filter(todo => 
    format(todo.dueDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Time and Date Section */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Clock />
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {format(selectedDate, 'MMMM do, yyyy')}
            </button>
          </CardTitle>
          {showCalendar && (
            <div className="mt-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date || new Date());
                  setShowCalendar(false);
                }}
                className="rounded-md border"
              />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Todo Form */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
          <CardDescription>Create a new todo item for your list</CardDescription>
        </CardHeader>
        <CardContent>
          <TodoForm 
            onSubmit={(newTodo) => setTodos([...todos, newTodo])}
            selectedDate={selectedDate}
          />
        </CardContent>
      </Card>

      {/* Todo Items */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
        {filteredTodos.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No tasks for {format(selectedDate, 'MMMM do, yyyy')}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem 
              key={todo.id}
              todo={todo}
              onStatusChange={(id, status) => {
                setTodos(todos.map(t => 
                  t.id === id ? { ...t, status } : t
                ));
              }}
              onDelete={(id) => {
                setTodos(todos.filter(t => t.id !== id));
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}; 