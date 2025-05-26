'use client';

import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Image } from '@heroui/image';
import { Link } from '@heroui/react';
import { useSession } from 'next-auth/react';
import LogoutButton from '@/app/auth/logout/page';

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Image alt="Next.js logo" src="/next.svg" width={300} />

      {isLoggedIn ? (
        <>
          <div>
            <h1 className="text-sm font-medium text-gray-900 dark:text-white">Welcome, {session?.user?.name || 'User'}</h1>
          </div>
          <LogoutButton />
        </>
      ) : (
        <Button radius="full" color="secondary" variant="shadow">
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
