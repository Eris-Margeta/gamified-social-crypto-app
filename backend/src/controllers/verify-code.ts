import { Request, Response } from "express";
import { fetchSessionIdByEmail } from "../services/get-session-id-from-email";
import { validateCode } from "../services/code-admin";

export async function verifyCode(req: Request, res: Response): Promise<void> {
	const { email, code } = req.body;

	if (!email || !code) {
		res.status(400).json({ error: "Email and code are required." });
		return;
	}

	const codeIsValid = validateCode(code);
	if (!codeIsValid) {
		res.status(400).json({ error: "Invalid code." });
		return;
	}

	const sessionID = await fetchSessionIdByEmail(email);
	if (sessionID) {
		res.json({ sessionID });
	} else {
		res.status(404).json({ error: "Session ID not found." });
	}
}
