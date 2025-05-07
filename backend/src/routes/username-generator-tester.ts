import { Request, Response } from "express";
import { generateCustomUsername } from "../services/username-generator";

export const testUsernameGeneration = async (req: Request, res: Response) => {
	try {
		const username = await generateCustomUsername();
		res.json({ username });
	} catch (error) {
		console.error("Error generating username:", error);
		res.status(500).send("Error generating username");
	}
};
