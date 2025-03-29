'use client';

import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Image } from '@heroui/image';
import { Link } from '@heroui/react';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Image alt="Next.js logo" src="/next.svg" width={300} />

      <Button radius="full" color="secondary" variant="shadow">
        <Link href="/auth/login">Login</Link>
      </Button>
    </div>
  );
}
