import { Request, Response } from "express";

export const authStatus = async (req: Request, res: Response) => {
	const sessionID = req.headers["session-id"];

	if (!sessionID) {
		return res
			.status(200)
			.json({ authenticated: false, message: "Session ID is required" });
	}

	// TODO: Implement a database check for the validity of the sessionID here

	const isValidSession = true;

	if (isValidSession) {
		return res
			.status(200)
			.json({ authenticated: true, message: "User is authenticated" });
	} else {
		return res
			.status(200)
			.json({ authenticated: false, message: "Invalid session ID" });
	}
};
