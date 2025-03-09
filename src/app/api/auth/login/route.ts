import db from '@/utils/db';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createSession } from '@/app/lib/session';

export const POST = async (req: NextRequest) => {
  await db.read(); // load latest data from file
  console.log('db.data', db.data);
  if (!db.data) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
  }
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const validUser = db.data.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!validUser) {
    return NextResponse.json({ error: 'Email or password is incorrect' }, { status: 400 });
  }

  await createSession({ userId: validUser.email, role: validUser.role });

  const { name, role } = validUser;
  return NextResponse.json({ user: { email, name, role } });
};
