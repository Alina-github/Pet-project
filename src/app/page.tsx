'use client';

import { useSession } from 'next-auth/react';
import NextImage from 'next/image';
import Link from 'next/link';

import LogoutButton from '@/app/auth/logout/page';

import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <NextImage alt="Next.js logo" src="/next.svg" width={300} height={100} />

      {isLoggedIn ? (
        <>
          <div>
            <h1 className="text-sm font-medium text-gray-900 dark:text-white">
              Welcome, {session?.user?.name || 'User'}
            </h1>
          </div>
          <LogoutButton />
        </>
      ) : (
        <Button asChild variant="secondary" className="rounded-full shadow-md">
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
