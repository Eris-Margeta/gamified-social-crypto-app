import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

const openDb = async () => {
	return open({
		filename: path.join(__dirname, "..", "data-received", "database.db"),
		driver: sqlite3.Database,
	});
};

export const getReferrerBySessionId = async (
	sessionID: string
): Promise<string | null> => {
	const db = await openDb();
	try {
		const row = await db.get(
			`SELECT referrer FROM userData WHERE sessionID = ?`,
			sessionID
		);

		await db.close();

		if (row) {
			return row.referrer;
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error querying for referrer by sessionID:", error);
		await db.close();
		throw error;
	}
};
