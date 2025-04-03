import { prisma } from '@/utils/prisma';
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createSession } from '@/app/lib/session';

// Corrected password verification function
async function verifyPassword(enteredPassword: string, storedHash: string) {
  return await bcrypt.compare(enteredPassword, storedHash);
}

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Find user by email using Prisma
  const user = await prisma.users.findUnique({
    where: { email }
  });

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
