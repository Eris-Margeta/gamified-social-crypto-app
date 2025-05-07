import { Request, Response } from "express";
import { openDb } from "../services/db-connection";

export const getUserPointsHandler = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const db = await openDb();
        const tableName = username.replace(/[^a-zA-Z0-9_]/g, "_");

        const tableExists = await db.get(
            `SELECT name FROM sqlite_master WHERE type='table' AND name=?`, 
            [tableName]
        );

        if (!tableExists) {
            await db.close();
            return res.status(404).json({ error: "User does not exist" });
        }

        // Fetch all rows for the user
        const rows = await db.all(
            `SELECT points, from_action, isUnique FROM "${tableName}" ORDER BY id ASC`
        );

        let totalPoints = 0;
        const uniqueActionsProcessed = new Set();

        for (const row of rows) {
            if (row.isUnique) {
                if (!uniqueActionsProcessed.has(row.from_action)) {
                    totalPoints += row.points;
                    uniqueActionsProcessed.add(row.from_action); // Mark this action as processed
                }
                // Skip further rows for this action since it's marked as unique and already processed
            } else {
                // Sum points for non-unique actions
                totalPoints += row.points;
            }
        }

        await db.close();
        res.json({ username, totalPoints });
    } catch (error) {
        console.error(`Failed to retrieve points for ${username}:`, error);
        res.status(500).json({ error: "Failed to retrieve user points" });
    }
};
