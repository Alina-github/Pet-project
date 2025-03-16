import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createSession } from '@/app/lib/session';

// Corrected password verification function
async function verifyPassword(enteredPassword: string, storedHash: string) {
  return await bcrypt.compare(enteredPassword, storedHash);
}

export const POST = async (req: NextRequest) => {
  await db.read(); // Load latest data from file
  if (!db.data) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Find user by email
  const user = db.data.users.find((user) => user.email === email);

  if (!user) {
    return NextResponse.json({ error: 'Email is incorrect' }, { status: 400 });
  }

  // Properly await password verification
  const isValidPassword = await verifyPassword(password, user.password as string);

  if (!isValidPassword) {
    return NextResponse.json({ error: 'Password is incorrect' }, { status: 400 });
  }

  await createSession({ userId: user.email, role: user.role });

  const { name, role } = user;
  return NextResponse.json({ user: { email, name, role } });
};
