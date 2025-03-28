// Example of how to use the prisma client to get data from the database
import { prisma } from '@/utils/prisma';
import type { Prisma } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email, name, role, page, perPage } = await req.json();

  if (!email || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const _config: Prisma.UserFindManyArgs = {
    where: {
      email,
    },
    select: {
      id: true,
    },
    include: {
      posts: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },

    take: perPage,
    skip: (page - 1) * perPage,
  };

  const _existingUsers = await prisma.user.findMany(_config);
  const _total = await prisma.user.count({ where: _config.where });

  return NextResponse.json({
    users: _existingUsers,
    page: page,
    total: _total,
  });
};
