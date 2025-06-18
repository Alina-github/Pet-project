import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email, password, code } = await req.json();

  if (!email || !password || !code) {
    return NextResponse.json({ error: 'Missing required data.' }, { status: 400 });
  }

  let user;
  // Find user and verification code in the database
  try {
    user = await prisma.user.findFirst({
      where: {
        AND: [
          { email },
          { codes: { some: { code: Number(code) } } },
        ],
      }
    });
  } catch {
    return NextResponse.json(
      { error: `Sorry, something went wrong. Please try again.` },
      { status: 500 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { error: `Incoming parameters are incorrect.` },
      { status: 403 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

// Update user password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

// Delete code
    await prisma.code.delete({
      where: {
        email_code: {
          email,
          code: Number(code),
        },
      },
    });

    const { name, role } = user;

    return NextResponse.json({ user: { name, email, role } });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json(
      { error: `Sorry, something went wrong. Please try again.` },
      { status: 500 }
    );
  }
};
