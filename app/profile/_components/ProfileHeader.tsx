// ProfileHeader.tsx
"use client";

import Image from "next/image";

interface ProfileHeaderProps {
  userId: string;
  username?: string;
  avatarUrl?: string;
  joinDate?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userId, username, avatarUrl, joinDate }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-24 h-24 bg-gray-500 rounded-full overflow-hidden mb-4">
        {avatarUrl ? (
          <Image src={avatarUrl} alt="Avatar" width={96} height={96} />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700">
            No Avatar
          </div>
        )}
      </div>
      <h2 className="text-2xl font-semibold">{username || "Anonymous User"}</h2>
      {joinDate && <p className="text-sm text-gray-400">Joined {joinDate}</p>}
      {userId && <p className="text-xs text-gray-500 mt-2">User ID: {userId}</p>}
      
      <div className="flex gap-4 mt-4">
        <div>
          <p className="text-lg font-bold">0</p>
          <p className="text-xs text-gray-400">FOLLOWERS</p>
        </div>
        <div>
          <p className="text-lg font-bold">0</p>
          <p className="text-xs text-gray-400">BOOSTS</p>
        </div>
        <div>
          <p className="text-lg font-bold">0</p>
          <p className="text-xs text-gray-400">IDEAS</p>
        </div>
        <div>
          <p className="text-lg font-bold">0</p>
          <p className="text-xs text-gray-400">SCRIPTS</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
