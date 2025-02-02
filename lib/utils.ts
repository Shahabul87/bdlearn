import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanHtml = (html: string | null) => {
  if (!html) return "";
  
  // Remove HTML tags
  let clean = html.replace(/<[^>]*>/g, ' ');
  
  // Replace special characters
  clean = clean.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#039;/g, "'")
               .replace(/&apos;/g, "'");
  
  // Remove extra spaces
  clean = clean.replace(/\s+/g, ' ').trim();
  
  return clean;
};
