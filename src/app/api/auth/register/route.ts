import { prisma } from '@/utils/prisma';
import { randomInt } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getSession } from '@/app/lib/session';

export const POST = async (req: NextRequest) => {
  const { email, name, role } = await req.json();

  if (!email || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const session = await getSession();
  const curUserRole = session?.role;

  if (!curUserRole) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (
    role.toLowerCase() !== 'user' &&
    typeof curUserRole == 'string' &&
    curUserRole?.toLowerCase() !== 'admin'
  ) {
    return NextResponse.json({ error: 'Only admins can assign admin roles.' }, { status: 403 });
  }

  try {
    // Check if user already exists using Prisma
    const existingUser = await prisma.user.findUnique({
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

    await prisma.user.create({
      data: { ...newUser, codes: { create: { email, code } } },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json(
      { error: `Sorry, something went wrong. Please try again.` },
      { status: 500 }
    );
  }

  // TODO: send email to user's email with link to frontend to set new password (not implementing now)

  return NextResponse.json({ email, name, role }, { status: 200 });
};
