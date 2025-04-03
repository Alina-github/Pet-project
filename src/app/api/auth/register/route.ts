import { prisma } from '@/utils/prisma';
import { randomInt } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email, name, role } = await req.json();

  if (!email || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Check if user already exists using Prisma
  const existingUser = await prisma.users.findUnique({
    where: { email }
  });
  
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const code = randomInt(100000, 999999); // Generate a 6-digit code
  
  // Create user and verification code in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create user
    const newUser = await tx.users.create({
      data: {
        email,
        name,
        role
      }
    });
    
    // Create verification code
    await tx.codes.create({
      data: {
        email,
        code
      }
    });
    
    return newUser;
  });

  // TODO: send email to user's email with link to frontend to set new password (not implementing now)

  return NextResponse.json({ email, name, role }, { status: 200 });
};
