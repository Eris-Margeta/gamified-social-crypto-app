import { Request, Response } from "express";
import { verifySession } from "../services/session-verifier";

export const authorizeSession = async (req: Request, res: Response) => {
	const { sessionID } = req.body;

	console.log("Backend Received sessionID:", sessionID);

	if (!sessionID) {
		return res.status(400).send("SessionID is required");
	}

	try {
		console.log("Backend Verifying sessionID:", sessionID);
		const isValidSession = await verifySession(sessionID);

		if (!isValidSession) {
			return res.status(404).send("Session not found");
		}

		res.cookie("SessionID", sessionID, { httpOnly: true });
		console.log("Backend sessionID Authorized:", sessionID);
		return res.status(200).send("Authorized");
	} catch (error) {
		console.error("Authorization error:", error);
		return res.status(500).send("Internal server error");
	}
};
