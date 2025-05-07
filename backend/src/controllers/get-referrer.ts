import { Request, Response } from "express";
import { getReferrerBySessionId } from "../services/get-referrer-from-session-id";

export const getReferrer = async (req: Request, res: Response) => {
	const sessionID = req.headers["session-ID"];

	if (!sessionID) {
		return res.status(400).json({ error: "Session ID is required" });
	}

	try {
		const referrer = await getReferrerBySessionId(sessionID.toString());
		if (referrer) {
			res.json({ referrer });
		} else {
			res.status(404).json({ error: "Session not found" });
		}
	} catch (error) {
		console.error("Failed to retrieve session data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
