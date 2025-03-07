import { randomInt } from 'crypto';
import { NextResponse } from 'next/server';

// import db from '@/utils/db'; //TODO: check why this path is not working
import db from '../../../utils/db.js';

export const POST = async (req) => {
  await db.read(); // load latest data from file
  const { email, name, role } = await req.json();

  if (!email || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const existingUser = db.data.users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const code = randomInt(100000, 999999); // Generate a 6-digit code
  const newUser = { email, name, role, password: null };
  db.data.users.push(newUser);
  db.data.codes.push({ email, code });
  await db.write(); // save new state to file

  // TODO: send email to user's email with link to frontend to set new password (not implementing now)

  return NextResponse.json({ user: newUser }, { status: 200 });
};
