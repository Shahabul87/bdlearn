import { LucideIcon } from "lucide-react";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  icon: LucideIcon;
  downloadUrl: string;
  category: string;
  tags: string[];
  link?: string;
  imageUrl?: string;
  createdAt: Date;
} 