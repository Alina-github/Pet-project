import { prisma } from '@/utils/prisma';
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email, password, code } = await req.json();

  if (!email || !password || !code) {
    return NextResponse.json({ error: 'Missing required data.' }, { status: 400 });
  }
  // Find user and verification code in the database
  const existingUser = await prisma.users.findUnique({
    where: { email }
  });
  
  const validCode = await prisma.codes.findUnique({
    where: { email }
  });

  if (!existingUser || !validCode || validCode.code != code) {
    return NextResponse.json(
      { error: `Invalid ${!existingUser ? 'user' : 'code'}` },
      { status: 403 }
    );
  }

  // Update user's password and delete the verification code in a transaction
  await prisma.$transaction(async (tx) => {
    // Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    await tx.users.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    // Delete the verification code
    await tx.codes.delete({
      where: { email }
    });
  });

  const { name, role } = existingUser;
  return NextResponse.json({ user: { name, email, role } });
};
