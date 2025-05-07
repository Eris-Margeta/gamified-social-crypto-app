import { openDb } from "./db-writer";

export const verifySession = async (sessionID: string): Promise<boolean> => {
    console.log("Verifying sessionID in DB:", sessionID);
    const db = await openDb();
    const result = await db.get(
        `SELECT sessionID FROM userData WHERE sessionID = ?`,
        [sessionID]
    );
    await db.close();

    if (!result) {
        console.log("Session ID not found:", sessionID);
        throw new Error(`Session ID not found: ${sessionID}`);
    }

    console.log("DB Verification result for sessionID:", sessionID, "is", true);
    return true;
};
