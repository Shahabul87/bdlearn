import React from 'react'
import { Header } from './header';
import { HeaderAfterLogin } from './header-after-login';
import { User } from '@prisma/client';

interface ConditionalHeaderProps {
  user: User | null;
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
          <HeaderAfterLogin />
        </div>
      )}
    </>
  );
};

export default ConditionalHeader;
