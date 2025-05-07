import { openDb } from "./db-writer";

export const findReferrerUsernameById = async (
	referrerID: string,
	newUserEmail: string
): Promise<string | null> => {
	const db = await openDb();

	const referrerUser = await db.get(
		`SELECT username FROM userData WHERE newUserID = ?`,
		referrerID
	);

	if (referrerUser) {
		await db.run(`UPDATE userData SET referrer = ? WHERE newUser = ?`, [
			referrerUser.username,
			newUserEmail,
		]);
		await db.close();
		return referrerUser.username;
	}

	await db.close();
	return null;
};
