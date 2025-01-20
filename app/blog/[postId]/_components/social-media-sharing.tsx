"use client";

import { SocialMediaShareButtons } from './social-media-sharing-buttons';

interface SocialMediaShareProps {
  postTitle: string;
}

export const SocialMediaShare = ({ postTitle }: SocialMediaShareProps) => {
  const currentURL = typeof window !== 'undefined' ? window.location.href : '';

  return <SocialMediaShareButtons postTitle={postTitle} currentURL={currentURL} />;
};




