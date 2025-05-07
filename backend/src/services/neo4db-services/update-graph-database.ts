import { openDb } from "../db-writer";
import * as graphDb from "./graph-db-service";
import cron from "node-cron";

export const processUserData = async () => {
	const db = await openDb();
	const users = await db.all(`
    SELECT * FROM userData ORDER BY id ASC
  `);

	for (const user of users) {
		if (user.referrer) {
			await graphDb.addUserUnderReferrer(user.username, user.referrer);
		} else {
			await graphDb.startNewTree(user.username);
		}
	}

	await db.close();
};

cron.schedule("*/144 * * * *", processUserData);
