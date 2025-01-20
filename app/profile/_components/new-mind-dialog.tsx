"use client";

import { useState } from "react";
import { X, Plus, Tag } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface NewMindDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export const NewMindDialog = ({ open, onClose, userId }: NewMindDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private" | "collaborative">("private");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags(prev => [...prev, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true);
    try {
      const mind = {
        title,
        description,
        category,
        visibility,
        tags,
        status,
        content: {}, // Initial empty mind map structure
        userId,
      };

      // await axios.post("/api/minds", mind);
      console.log("Submitting mind map:", mind);

      onClose();
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setVisibility("private");
      setTags([]);
    } catch (error) {
      console.error("Failed to create mind map:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white dark:ring-offset-gray-900 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Create New Mind Map
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-200 font-medium">Title</Label>
            <Input
              placeholder="Enter mind map title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-purple-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-200 font-medium">Description</Label>
            <Textarea
              placeholder="Describe your mind map..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-[100px] focus:ring-purple-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-200 font-medium">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:ring-purple-500/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Education" className="text-gray-700 dark:text-gray-200 focus:bg-purple-50 dark:focus:bg-purple-500/20">Education</SelectItem>
                  <SelectItem value="Technology" className="text-gray-700 dark:text-gray-200 focus:bg-purple-50 dark:focus:bg-purple-500/20">Technology</SelectItem>
                  <SelectItem value="Business" className="text-gray-700 dark:text-gray-200 focus:bg-purple-50 dark:focus:bg-purple-500/20">Business</SelectItem>
                  <SelectItem value="Personal" className="text-gray-700 dark:text-gray-200 focus:bg-purple-50 dark:focus:bg-purple-500/20">Personal</SelectItem>
                  <SelectItem value="Other" className="text-gray-700 dark:text-gray-200 focus:bg-purple-50 dark:focus:bg-purple-500/20">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-200 font-medium">Visibility</Label>
              <Select value={visibility} onValueChange={(v: typeof visibility) => setVisibility(v)}>
                <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:ring-purple-500/50">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="public" className="text-gray-700 dark:text-gray-200 focus:bg-purple-50 dark:focus:bg-purple-500/20">Public</SelectItem>
                  <SelectItem value="private" className="text-gray-700 dark:text-gray-200 focus:bg-purple-50 dark:focus:bg-purple-500/20">Private</SelectItem>
                  <SelectItem value="collaborative" className="text-gray-700 dark:text-gray-200 focus:bg-purple-50 dark:focus:bg-purple-500/20">Collaborative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-200 font-medium">Tags</Label>
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[42px]">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 rounded-full text-sm group"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="p-0.5 rounded-full hover:bg-purple-100 dark:hover:bg-purple-400/20 group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags... (Press Enter)"
                className="flex-1 min-w-[120px] border-0 bg-transparent text-gray-900 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit("draft")}
              disabled={isSubmitting}
              className="border-amber-500/50 bg-amber-50 dark:bg-amber-500/5 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/10 hover:text-amber-800 dark:hover:text-amber-200"
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSubmit("published")}
              disabled={isSubmitting || !title.trim()}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create & Edit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 