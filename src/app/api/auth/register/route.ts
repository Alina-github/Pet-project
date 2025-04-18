import { prisma } from '@/utils/prisma';
import { randomInt } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';

export const POST = async (req: NextRequest) => {
  const { email, name, role } = await req.json();

  const session = await getSession();

  const curUserRole = session?.role;

  if (role && role !== 'user' && curUserRole !== 'admin') {
    return NextResponse.json({ error: 'Error. Only Admins can create users with admin role.' }, { status: 403 });
  }

  if (!email || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Check if user already exists using Prisma
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const code = randomInt(100000, 999999); // Generate a 6-digit code

  const newUser = {
    email,
    name,
    role,
  };

  await prisma.$transaction(async (tx) => {
    // Create user
    await tx.users.create({
      data: newUser,
    });

    // Create verification code
    await tx.codes.create({
      data: {
        email,
        code,
      },
    });
  });

  // TODO: send email to user's email with link to frontend to set new password (not implementing now)

  return NextResponse.json({ email, name, role }, { status: 200 });
};
