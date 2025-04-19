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
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  const validCode = await prisma.code.findUnique({
    where: { email },
  });

  if (!existingUser || !validCode || validCode.code != code) {
    return NextResponse.json(
      { error: `Invalid ${!existingUser ? 'user' : 'code'}` },
      { status: 403 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    await prisma.code.delete({
      where: { email },
    });

    const { name, role } = existingUser;

    return NextResponse.json({ user: { name, email, role } });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json(
      { error: `Sorry, something went wrong. Please try again.` },
      { status: 500 }
    );
  }
};
