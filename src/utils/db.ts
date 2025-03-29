import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';

// File storage path
const file = join(process.cwd(), 'db.json');

interface DatabaseSchema {
  users: { email: string; name: string; role: string; password?: string }[];
  codes: { email: string; code: number }[];
}

// Create a new database instance
const adapter = new JSONFile<DatabaseSchema>(file);
const db = new Low(adapter, { users: [], codes: [] });

// Read database
await db.read();

// Writes the default structure if the file is empty
await db.write();

export default db;
