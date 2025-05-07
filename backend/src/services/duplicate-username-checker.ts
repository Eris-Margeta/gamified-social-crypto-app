import { openDb } from "./db-writer";

export const checkUsernameExists = async (
	username: string
): Promise<boolean> => {
	const db = await openDb();
	const result = await db.get(
		`SELECT username FROM userData WHERE username = ?`,
		[username]
	);
	await db.close();
	return !!result;
};
