import { Request, Response } from "express";
import { getUserIdBySessionId } from "../services/db-writer/user-data-service";

export const getUsernameBySessionIdController = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { sessionID } = req.params;

	try {
		const username = await getUserIdBySessionId(sessionID);
		if (username) {
			res.json({ username });
		} else {
			res
				.status(404)
				.json({ message: "Username not found for provided sessionID." });
		}
	} catch (error) {
		console.error("Failed to retrieve username:", error);
		res.status(500).json({ error: "Internal server error." });
	}
};
