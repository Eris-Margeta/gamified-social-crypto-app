import { Request, Response } from "express";

export const clearSession = (req: Request, res: Response) => {
	res.clearCookie("SessionID");
	return res.status(200).send("Session cleared");
};
