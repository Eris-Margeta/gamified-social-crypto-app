import { Request, Response } from "express";
import { openDb } from "../services/db-connection";

export const getActionPointsHandler = async (req: Request, res: Response) => {
    const { username } = req.params;
    const from_action = req.query.from_action as string;

    if (!from_action) {
        return res.status(400).json({ error: "Missing 'from_action' query parameter" });
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
            return res.status(404).json({ error: "User does not exist" });
        }

        // Query to handle both isUnique true and false cases
        const result = await db.all(
            `SELECT id, points, isUnique FROM "${tableName}" WHERE from_action = ? ORDER BY id ASC`,
            [from_action]
        );

        if (!result || result.length === 0) {
            return res.json({ username, from_action, totalPoints: 0 });
        }

        let totalPoints = 0;
        let uniqueActionProcessed = false;

        for (const row of result) {
            if (row.isUnique && !uniqueActionProcessed) {
                totalPoints += row.points;
                uniqueActionProcessed = true; // Ensure only the first unique action contributes to the total
            } else if (!row.isUnique) {
                totalPoints += row.points; // Sum all non-unique action points
            }
        }

        res.json({ username, from_action, totalPoints });
    } catch (error) {
        console.error(`Failed to retrieve action points for ${username} with action ${from_action}:`, error);
        res.status(500).json({ error: "Failed to retrieve user points for action" });
    }
};
