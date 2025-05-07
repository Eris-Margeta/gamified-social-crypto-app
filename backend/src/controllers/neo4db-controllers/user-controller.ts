import { Request, Response } from "express";
import * as userModel from "../../models/neo4db-models/user-model";

export const addUser = async (req: Request, res: Response): Promise<void> => {
	const { userId, referrerId } = req.body;
	try {
		const user = await userModel.createUser({ userId, referrerId });
		res.json(user);
	} catch (error: any) {
		if (error instanceof Error) {
			res.status(500).send(error.message);
		} else {
			res.status(500).send("An unexpected error occurred");
		}
	}
};
