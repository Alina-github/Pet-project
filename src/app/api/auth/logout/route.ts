import db from '@/utils/db';
import { NextResponse } from 'next/server';

import { deleteSession } from '@/app/lib/session';

export const POST = async () => {
  await db.read(); // load latest data from file

  if (!db.data) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
  }

  await deleteSession();

  return NextResponse.json({ success: true });
};
