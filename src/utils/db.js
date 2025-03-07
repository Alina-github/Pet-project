import { JSONFile, Low } from 'lowdb';
import { join } from 'path';

// File storage path
const file = join(process.cwd(), 'db.json');

// Create a new database instance
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Default data structure
await db.read();
db.data ||= { users: [], codes: [] }; // Ensure default structure
await db.write();

export default db;
