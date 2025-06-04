'use client';

import { useSession } from 'next-auth/react';
import NextImage from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <h6 className="text-4xl font-medium dark:text-white">MonViz</h6>
      {isLoggedIn ? (
          <div>
            <h1 className="text-sm font-medium text-gray-900 dark:text-white">
              Welcome, {session?.user?.name || 'User'}
            </h1>
          </div>
      ) : (
        <Button asChild variant="secondary" className="rounded-full shadow-md">
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
