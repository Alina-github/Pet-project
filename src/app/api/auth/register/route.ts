import db from '@/utils/db';
import { randomInt } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  await db.read(); // load latest data from file
  const { email, name, role } = await req.json();

  if (!db.data) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
  }

  if (!email || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const existingUser = db.data.users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const code = randomInt(100000, 999999); // Generate a 6-digit code
  const newUser = { email, name, role };
  db.data.users.push(newUser);
  db.data.codes.push({ email, code });
  await db.write(); // save new state to file

  // TODO: send email to user's email with link to frontend to set new password (not implementing now)

  return NextResponse.json({ email, name, role }, { status: 200 });
};
