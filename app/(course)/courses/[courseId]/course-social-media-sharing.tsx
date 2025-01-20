"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandX,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconLink,
} from "@tabler/icons-react";

interface SocialShareProps {
  courseTitle: string;
}

const socialIcons = [
  {
    name: "Twitter",
    icon: IconBrandX,
    color: "hover:bg-black",
    textColor: "group-hover:text-white",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: IconBrandFacebook,
    color: "hover:bg-blue-600",
    textColor: "group-hover:text-white",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "hover:bg-blue-700",
    textColor: "group-hover:text-white",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    icon: IconBrandWhatsapp,
    color: "hover:bg-green-500",
    textColor: "group-hover:text-white",
    getUrl: (url: string, title: string) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
  },
  {
    name: "Instagram",
    icon: IconBrandInstagram,
    color: "hover:bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500",
    textColor: "group-hover:text-white",
    getUrl: () => "https://www.instagram.com/",
  },
];

export const CourseSocialMediaShare: React.FC<SocialShareProps> = ({ courseTitle }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-6">
      <span className="text-gray-400 font-medium">Share via:</span>
      <div className="flex items-center gap-3">
        {socialIcons.map((social) => (
          <motion.div
            key={social.name}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredIcon(social.name)}
            onHoverEnd={() => setHoveredIcon(null)}
          >
            <a
              href={social.getUrl?.(currentUrl, courseTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                block p-2 rounded-full transition-all duration-300
                ${social.color} group
                hover:shadow-lg hover:shadow-gray-800/20
              `}
              aria-label={`Share on ${social.name}`}
            >
              <social.icon
                className={`w-5 h-5 text-gray-600 transition-colors duration-300 ${social.textColor}`}
                stroke={1.5}
              />
            </a>
            <AnimatePresence>
              {hoveredIcon === social.name && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 
                    bg-gray-900 text-white px-3 py-1 rounded-full text-sm
                    whitespace-nowrap pointer-events-none
                    shadow-lg"
                >
                  {social.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Copy Link Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          onHoverStart={() => setHoveredIcon('copy')}
          onHoverEnd={() => setHoveredIcon(null)}
          className="relative group p-2 rounded-full hover:bg-gray-100 
            transition-all duration-300 hover:shadow-lg hover:shadow-gray-800/20"
          aria-label="Copy Link"
        >
          <IconLink
            className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300"
            stroke={1.5}
          />
          <AnimatePresence>
            {hoveredIcon === 'copy' && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 
                  bg-gray-900 text-white px-3 py-1 rounded-full text-sm
                  whitespace-nowrap pointer-events-none
                  shadow-lg"
              >
                {copiedLink ? "Copied!" : "Copy Link"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};