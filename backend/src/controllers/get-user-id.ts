import { Request, Response } from "express";
import { getUserIdBySessionId } from "../services/get-user-id-from-session-id";

export const getUserId = async (req: Request, res: Response) => {
	const sessionID = req.headers["session-id"];

	if (!sessionID) {
		return res.status(400).json({ error: "Session ID is required" });
	}

	try {
		const userID = await getUserIdBySessionId(sessionID.toString());
		if (userID) {
			res.json({ userID });
		} else {
			res.status(404).json({ error: "Session not found" });
		}
	} catch (error) {
		console.error("Failed to retrieve user ID:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
