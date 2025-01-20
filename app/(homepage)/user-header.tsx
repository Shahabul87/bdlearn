import React from 'react'
import { Header } from './header';
import { HeaderAfterLogin } from './header-after-login';
import { User } from '@prisma/client';

interface ConditionalHeaderProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: any;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  } | null | undefined;
}

const ConditionalHeader: React.FC<ConditionalHeaderProps> = ({ user }) => {
  return (
    <>
      {!user ? (
        <div>
          <Header />
        </div>
      ) : (
        <div>
          <HeaderAfterLogin user={user} />
        </div>
      )}
    </>
  );
};

export default ConditionalHeader;
