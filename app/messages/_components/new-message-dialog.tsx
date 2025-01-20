"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Users } from "lucide-react";

interface NewMessageDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export const NewMessageDialog = ({ open, onClose, userId }: NewMessageDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe",
      email: "john@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
      email: "jane@example.com",
    },
    // Add more mock users
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (user: User) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-200">
            New Message
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-gray-800 rounded-lg">
            {selectedUsers.map(user => (
              <div
                key={user.id}
                className="flex items-center gap-2 px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full"
              >
                <span>{user.name}</span>
                <button
                  onClick={() => toggleUser(user)}
                  className="text-purple-300 hover:text-purple-200"
                >
                  ×
                </button>
              </div>
            ))}
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[200px] border-0 bg-transparent text-gray-200 placeholder:text-gray-500 focus:ring-0"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                onClick={() => toggleUser(user)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                  ${selectedUsers.find(u => u.id === user.id)
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'hover:bg-gray-800 text-gray-200'
                  }
                `}
              >
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-gray-200 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              disabled={selectedUsers.length === 0}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Start Chat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 