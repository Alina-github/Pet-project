import { prisma } from '@/utils/prisma';
import { randomInt } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // Check if user exists using Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found. Create an account.' }, { status: 400 });
    }

    const code = randomInt(100000, 999999); // Generate a 6-digit code

    // Create the verification code.
    try {
      await prisma.code.create({ data: { email, code } });
    } catch (e) {
      return NextResponse.json(
        { error: `Sorry, something went wrong. Please try again.` },
        { status: 500 }
      );
    }

    // TODO: send email with reset link.

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: `Sorry, something went wrong. Please try again.` },
      { status: 500 }
    );
  }
};
