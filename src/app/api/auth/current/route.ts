import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';

import { getSession } from '@/app/lib/session';

export const GET = async () => {
  const session = await getSession();

  const userId = session?.userId;

  if (!userId) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const curUser = await prisma.users.findUnique({
    where: { email: userId as string }
  });

  if (!curUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { name, role, email } = curUser;

  return NextResponse.json({ name, role, email });
};
