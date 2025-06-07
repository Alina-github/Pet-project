import { prisma } from '@/utils/prisma';
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email, name, password } = await req.json();

  if (!email || !name || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Check if user already exists.
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists.' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({ data: { name, email, password: hashedPassword } });

    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user.' }, { status: 500 });
  }
};
