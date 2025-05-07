import { openDb } from "./db-writer";

export const fetchSessionIdByEmail = async (
	email: string
): Promise<string | null> => {
	const db = await openDb();
	try {
		const row = await db.get(
			"SELECT sessionID FROM userData WHERE newUser = ?",
			email
		);
		return row ? row.sessionID : null;
	} catch (error) {
		console.error("Error fetching sessionID by email:", error);
		return null;
	} finally {
		await db.close();
	}
};
