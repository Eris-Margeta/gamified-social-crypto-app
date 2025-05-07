import { Request, Response } from "express";
import { getUserData } from "../services/db-writer/user-data-service";

export const readUserDataController = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { username } = req.params;

	try {
		const userData = await getUserData(username);
		if (userData) {
			res.json(userData);
		} else {
			res.status(404).json({ message: "User not found." });
		}
	} catch (error) {
		console.error("Error reading user data:", error);
		res.status(500).json({ error: "Failed to read user data." });
	}
};
