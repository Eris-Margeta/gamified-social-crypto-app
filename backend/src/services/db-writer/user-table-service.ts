import { openDb } from "../db-connection";

export const createUserTable = async (username: string): Promise<void> => {
	const db = await openDb();
	await db.exec(`
    CREATE TABLE IF NOT EXISTS "${username}" (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      points INTEGER,
      from_action TEXT,
      isUnique BOOLEAN DEFAULT 0,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
	await db.close();
};

