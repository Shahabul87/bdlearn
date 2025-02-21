import { 
  Lightbulb, Brain, Code, Link as LinkIcon, Video, Music, 
  FileText, BookOpen, Users, UserPlus, Settings, Star, Rocket 
} from "lucide-react";

export const defaultTabs = [
  { id: "MAKE A PLAN", icon: Rocket, label: "Create Plan", isDefault: true },
  { id: "IDEAS", icon: Lightbulb, label: "Ideas", isDefault: true },
  { id: "MINDS", icon: Brain, label: "Minds", isDefault: true },
  { id: "SCRIPTS", icon: Code, label: "Scripts", isDefault: true },
  { id: "PROFILE LINKS", icon: LinkIcon, label: "Links", isDefault: true },
  { id: "VIDEOS", icon: Video, label: "Videos", isDefault: true },
  { id: "AUDIOS", icon: Music, label: "Audios", isDefault: true },
  { id: "ARTICLES", icon: FileText, label: "Articles", isDefault: true },
  { id: "BLOGS", icon: BookOpen, label: "Blogs", isDefault: true },
  { id: "FOLLOWERS", icon: Users, label: "Followers", isDefault: true },
  { id: "FOLLOWING", icon: UserPlus, label: "Following", isDefault: true },
  { id: "SETTINGS", icon: Settings, label: "Settings", isDefault: true },
  { id: "SUBSCRIPTION", icon: Star, label: "Premium", isDefault: true },
]; 