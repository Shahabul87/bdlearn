"use client";

import { 
  Twitter as TwitterIcon, 
  Facebook as FacebookIcon, 
  Linkedin as LinkedinIcon, 
  Link2, 
  Check,
  Mail,
  MessageCircle,
  Share2,
  Send,
  BookmarkPlus,
  Instagram as InstagramIcon,
  Youtube,
  Github as GithubIcon,
  Share as ShareIcon,
  MessageSquare as WhatsAppIcon,
  Send as TelegramIcon
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SocialMediaShareButtonsProps {
  postTitle: string;
  currentURL: string;
}

export const SocialMediaShareButtons = ({ postTitle, currentURL }: SocialMediaShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Twitter",
      icon: TwitterIcon,
      color: "text-sky-400 hover:text-sky-300",
      hoverBg: "hover:bg-sky-400/10",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(currentURL)}`,
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      color: "text-blue-500 hover:text-blue-400",
      hoverBg: "hover:bg-blue-400/10",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      color: "text-blue-600 hover:text-blue-500",
      hoverBg: "hover:bg-blue-400/10",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentURL)}&title=${encodeURIComponent(postTitle)}`,
    },
    {
      name: "Share",
      icon: ShareIcon,
      color: "text-red-500 hover:text-red-400",
      hoverBg: "hover:bg-red-400/10",
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentURL)}&description=${encodeURIComponent(postTitle)}`,
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      color: "text-blue-400 hover:text-blue-300",
      hoverBg: "hover:bg-blue-400/10",
      url: `https://t.me/share/url?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(postTitle)}`,
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      color: "text-green-500 hover:text-green-400",
      hoverBg: "hover:bg-green-400/10",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + currentURL)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "text-purple-400 hover:text-purple-300",
      hoverBg: "hover:bg-purple-400/10",
      url: `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(currentURL)}`,
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      color: "text-pink-500 hover:text-pink-400",
      hoverBg: "hover:bg-pink-400/10",
      url: `https://www.instagram.com/`,
    },
    {
      name: "GitHub",
      icon: GithubIcon,
      color: "text-gray-400 hover:text-gray-300",
      hoverBg: "hover:bg-gray-400/10",
      url: `https://github.com/`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-400 mr-2">Share:</span>
      <TooltipProvider>
        <div className="flex flex-wrap items-center gap-2">
          {shareLinks.map((platform) => {
            const Icon = platform.icon;
            return (
              <Tooltip key={platform.name}>
                <TooltipTrigger asChild>
                  <motion.a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-all duration-200 ${platform.color} ${platform.hoverBg} border border-gray-700/50`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="bg-gray-800 text-gray-200 border border-gray-700"
                >
                  <p>Share on {platform.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}

          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={copyToClipboard}
                className={`p-2 rounded-full transition-all duration-200 
                  ${copied 
                    ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-400/10'
                  } 
                  border border-gray-700/50`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="link"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center"
                    >
                      <Link2 className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom" 
              className="bg-gray-800 text-gray-200 border border-gray-700"
            >
              <p>{copied ? 'Copied!' : 'Copy link'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}; 