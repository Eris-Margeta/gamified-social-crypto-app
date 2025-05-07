import { Request, Response } from "express";
import { openDb } from "../services/db-connection";


export const addPoints = async (req: Request, res: Response) => {
	const { username, points, from_action, isUnique } = req.body;

	if (!username || points === undefined || !from_action) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	try {
		const db = await openDb();
		const tableName = username.replace(/[^a-zA-Z0-9_]/g, "_");

		const tableExists = await db.get(
			`SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
			[tableName]
		);

		if (!tableExists) {
			await db.close();
			return res.status(404).json({ error: "User table does not exist" });
		}
		console.log(`Inserting points: ${points}, from_action: ${from_action}, isUnique: ${isUnique}`);

		if (isUnique) {
			const actionExists = await db.get(
				`SELECT id FROM "${tableName}" WHERE from_action=? AND isUnique=1`,
				[from_action]
			);
		
			if (actionExists) {
				console.log("Unique action already exists, not adding points.");
				await db.close();
				return res.status(200).json({ warning: "Unique action - points not added because it has already been performed." });
			}
		}

		await db.run(
			`INSERT INTO "${tableName}" (points, from_action, isUnique) VALUES (?, ?, ?)`,
			[points, from_action, isUnique ? 1 : 0]
		);

		await db.close();
		res.status(200).json({ message: "Points added successfully" });

	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ error: "Failed to add points" });
	}
};
