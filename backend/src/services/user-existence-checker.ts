import { openDb } from "./db-writer";

export const checkUserExists = async (email: string): Promise<boolean> => {
	const db = await openDb();
	try {
		const user = await db.get(
			`SELECT * FROM userData WHERE newUser = ?`,
			email
		);
		return user !== undefined;
	} catch (error) {
		console.error("Error checking user existence:", error);
		throw error;
	} finally {
		await db.close();
	}
};
