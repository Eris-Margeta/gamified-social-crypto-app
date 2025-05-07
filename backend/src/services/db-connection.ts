import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

const ensureDirectoryExistence = (filePath: string) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
};

const dbPath = path.join(__dirname, "..", "data-received", "database.db");

export const openDb = async () => {
    ensureDirectoryExistence(dbPath);

    console.log(`Opening database at path: ${dbPath}`);

    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS userData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            referrer TEXT,
            referrerlink TEXT,
            referrerUsername TEXT,
            newUser TEXT,
            newUserID TEXT,
            sessionID TEXT,
            userIP TEXT,
            timestamp TEXT,
            discordUsername TEXT,
            instagramUsername TEXT,
            twitterUsername TEXT,
            phoneNumber TEXT,
            country TEXT,
            age INTEGER,
            profilePicture TEXT,
            lastLoggedIn DATETIME,
            isWhitelisted BOOLEAN DEFAULT 0,
            web3address TEXT,
            ownsnft BOOLEAN DEFAULT 0, 
            magicLink TEXT
        )
    `);

    return db;
};
