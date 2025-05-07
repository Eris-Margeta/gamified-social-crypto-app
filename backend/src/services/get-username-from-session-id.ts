import { openDb } from "./db-writer";

export const getUserIdBySessionId = async (
	sessionID: string
): Promise<string | null> => {
	const db = await openDb();
	try {
		const row = await db.get(
			`SELECT username FROM userData WHERE sessionID = ?`,
			sessionID
		);
		await db.close();

		if (row) {
			return row.username;
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error querying for username by sessionID:", error);
		await db.close();
		throw error;
	}
};
