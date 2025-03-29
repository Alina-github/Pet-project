import db from '@/utils/db';
import bcrypt from 'bcryptjs';
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
  const validCode = db.data.codes.find((dbcode) => dbcode.email === email && dbcode.code == code);

  if (!existingUser || !validCode) {
    return NextResponse.json(
      { error: `Invalid ${!existingUser ? 'user' : 'code'}` },
      { status: 403 }
    );
  }

  existingUser.password = await bcrypt.hash(password, 10); // 10 is the recommended salt rounds
  db.data.codes = db.data.codes.filter((dbcode) => dbcode.email !== email && dbcode.code !== code);
  await db.write();

  const { name, role } = existingUser;
  return NextResponse.json({ user: { name, email, role } });
};
