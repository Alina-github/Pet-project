import { prisma } from '@/utils/prisma';
import { randomInt } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Check if user exists using Prisma
  const existingUser = await prisma.users.findUnique({
    where: { email }
  });

  if (!existingUser) {
    return NextResponse.json({ error: 'User not found. Create an account.' }, { status: 400 });
  }

  const code = randomInt(100000, 999999); // Generate a 6-digit code
  
  // Create or update the verification code
  await prisma.codes.upsert({
    where: { email },
    update: { code },
    create: { email, code }
  });

  // TODO: send email with reset link.

  return NextResponse.json({ success: true });
};
