import db from '@/utils/db';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  await db.read();
  const { email, password, code } = await req.json();

  if (!db.data) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
  }

  if (!email || !password || !code) {
    return NextResponse.json({ error: 'Missing required data.' }, { status: 400 });
  }

  let existingUser = db.data.users.find((user) => user.email === email);
  const validCode = db.data.codes.find((code) => code.email === email);

  if (!existingUser || !validCode) {
    return NextResponse.json({ error: 'Invalid code or user' }, { status: 403 });
  }

  existingUser.password = password;
  db.data.codes = db.data.codes.filter((code) => code.email !== email);
  await db.write();

  const { name, role } = existingUser;
  return NextResponse.json({ user: { name, email, role } });
};
