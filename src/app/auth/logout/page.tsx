'use client';

import { Button } from '@heroui/react';
import { addToast } from '@heroui/toast';
import { signOut } from 'next-auth/react';


export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: true, redirectTo: '/' });
    addToast({
      color: 'secondary',
      description: 'Logged out successfully.',
    });
  };

  return (
    <Button color={'secondary'} onClick={handleLogout}>
      {'Logout'}
    </Button>
  );
}
