'use client';

import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: true, redirectTo: '/' });
    toast.success('Logged out successfully!');
  };
  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
