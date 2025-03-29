import db from '@/utils/db';
import { NextResponse } from 'next/server';

import { getSession } from '@/app/lib/session';

export const GET = async () => {
  const session = await getSession();

  await db.read(); // load latest data from file

  const userId = session?.userId;

  if (!userId) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const curUser = db.data.users.find((user) => user.email === userId);

  if (!curUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { name, role, email } = curUser;

  return NextResponse.json({ name, role, email });
};
