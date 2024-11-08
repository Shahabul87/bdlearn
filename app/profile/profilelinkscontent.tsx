import React from 'react';
import { ProfileLinkForm } from './profile-link-form';
import { ProfileLink } from '@prisma/client';

interface ProfileLinksContentProps {
  userId: string;
  profileLinks: ProfileLink[]; // Accept profileLinks as a prop
}

export const ProfileLinksContent: React.FC<ProfileLinksContentProps> = ({ userId, profileLinks }) => {
  return (
    <div className="p-4 text-gray-300 bg-gray-800 rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Profile Links</h2>
      
      {profileLinks.length > 0 ? (
        <ul>
          {profileLinks.map((link) => (
            <li key={link.id} className="mb-2">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {link.platform}: {link.url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No profile links available.</p>
      )}

      {/* Render the ProfileLinkForm with userId and profileLinks */}
      <ProfileLinkForm userId={userId} profileLinks={profileLinks} />
    </div>
  );
};

export default ProfileLinksContent;
