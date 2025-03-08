import db from '@/utils/db';
import { randomInt } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  await db.read();
  const { email } = await req.json();

  if (!db.data) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const existingUser = db.data.users.find((user) => user.email === email);

  if (!existingUser) {
    return NextResponse.json({ error: 'User not found. Create an account.' }, { status: 400 });
  }

  const code = randomInt(100000, 999999); // Generate a 6-digit code
  db.data.codes.push({ email, code });

  await db.write();

  // TODO: send email  with reset link.

  return NextResponse.json({ success: true });
};
