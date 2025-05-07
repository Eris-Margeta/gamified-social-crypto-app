import { openDb } from "../db-connection";

export const writeToDb = async (record: {
	username: string;
	referrer: string;
	referrerlink: string;
	referrerUsername: string;
	newUser: string;
	newUserID: string;
	sessionID: string;
	userIP: string;
	timestamp: string;
	discordUsername?: string;
	instagramUsername?: string;
	twitterUsername?: string;
	phoneNumber?: string;
	country?: string;
	age?: number;
	profilePicture?: string;
	lastLoggedIn?: string;
	isWhitelisted?: boolean;
	web3address?: string;
	ownsnft?: boolean;
	magicLink?: string;
}) => {
	const db = await openDb();
	await db.run(
		`INSERT INTO userData (
            username, referrer, referrerlink, referrerUsername, newUser, newUserID, sessionID, userIP, timestamp,
            discordUsername, instagramUsername, twitterUsername, phoneNumber, country, age, profilePicture, lastLoggedIn,
            isWhitelisted, web3address, ownsnft, magicLink
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			record.username,
			record.referrer,
			record.referrerlink,
			record.referrerUsername,
			record.newUser,
			record.newUserID,
			record.sessionID,
			record.userIP,
			record.timestamp,
			record.discordUsername,
			record.instagramUsername,
			record.twitterUsername,
			record.phoneNumber,
			record.country,
			record.age,
			record.profilePicture,
			record.lastLoggedIn,
			record.isWhitelisted,
			record.web3address,
			record.ownsnft,
			record.magicLink,
		]
	);
	await db.close();
};

export const updateUserReferrer = async (
	newUserEmail: string,
	referrerUsername: string
): Promise<void> => {
	const db = await openDb();
	await db.run(`UPDATE userData SET referrer = ? WHERE newUser = ?`, [
		referrerUsername,
		newUserEmail,
	]);
	await db.close();
};

export const updateUserData = async (
	username: string,
	updates: {
		discordUsername?: string;
		instagramUsername?: string;
		twitterUsername?: string;
		phoneNumber?: string;
		country?: string;
		age?: number;
		profilePicture?: string;
		lastLoggedIn?: string;
		isWhitelisted?: boolean;
		web3address?: string;
		ownsnft?: boolean;
	}
): Promise<void> => {
	const db = await openDb();
	const fieldsToUpdate = Object.entries(updates)
		.filter(([_, value]) => value !== undefined)
		.map(([key, value]) => `${key} = ?`)
		.join(", ");
	const valuesToUpdate = Object.values(updates).filter(
		(value) => value !== undefined
	);

	if (fieldsToUpdate.length > 0) {
		const sql = `UPDATE userData SET ${fieldsToUpdate} WHERE username = ?`;
		await db.run(sql, [...valuesToUpdate, username]);
	}

	await db.close();
};

export const getUserData = async (username: string): Promise<any> => {
	const db = await openDb();
	try {
		const userData = await db.get(
			`
            SELECT 
                username, referrer, discordUsername, instagramUsername, twitterUsername, phoneNumber, country, age, profilePicture,
                isWhitelisted, web3address, ownsnft, magicLink
            FROM userData 
            WHERE username = ?`,
			[username]
		);
		return userData;
	} catch (error) {
		console.error(`Failed to get user data for ${username}:`, error);
		throw error;
	} finally {
		await db.close();
	}
};

export const getUserIdBySessionId = async (
	sessionID: string
): Promise<string | null> => {
	const db = await openDb();
	try {
		const row = await db.get(
			`SELECT username FROM userData WHERE sessionID = ?`,
			sessionID
		);

		return row ? row.username : null;
	} catch (error) {
		console.error("Error querying for username by sessionID:", error);
		throw error;
	} finally {
		await db.close();
	}
};
