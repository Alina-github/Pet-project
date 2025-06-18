import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function verifyCredentials(email: string, password: string) {
  if (!email || !password) {
    return null;
  }

  // Find user by email.
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Optionally, this is also the place you could do a user registration
    return null;
  }

  const isValidPassword = await compare(password, user.password as string);

  if (user && isValidPassword) {
    return { name: user.name, role: user.role, email: user.email };
  } else {
    return null;
  }
} 