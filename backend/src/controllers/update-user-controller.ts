import { Request, Response } from "express";
import { updateUserData } from "../services/db-writer/user-data-service";

interface UserUpdateFields {
    referrer?: string;
    discordUsername?: string;
    instagramUsername?: string;
    twitterUsername?: string;
    phoneNumber?: string;
    country?: string;
    age?: number;
    profilePicture?: string;
    isWhitelisted?: boolean;
    web3address?: string;
    ownsnft?: boolean;
}

const allowedUpdates: (keyof UserUpdateFields)[] = [
    "referrer",
    "discordUsername",
    "instagramUsername",
    "twitterUsername",
    "phoneNumber",
    "country",
    "age",
    "profilePicture",
    "isWhitelisted",
    "web3address",
    "ownsnft",
];

function assignUpdate<T>(obj: T, key: keyof T, value: any): T {
    return { ...obj, [key]: value };
}

export const updateUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { username } = req.params;
    const updates: Partial<UserUpdateFields> = req.body;

    const filteredUpdates = Object.keys(updates)
        .filter((key): key is keyof UserUpdateFields =>
            allowedUpdates.includes(key as keyof UserUpdateFields)
        )
        .reduce((obj: Partial<UserUpdateFields>, key) => {
            return assignUpdate(obj, key, updates[key]);
        }, {});

    try {
        if (Object.keys(filteredUpdates).length > 0) {
            await updateUserData(username, filteredUpdates);
            res.status(200).json({ message: "User data updated successfully." });
        } else {
            res.status(400).json({ message: "No valid fields provided for update." });
        }
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ error: "Failed to update user data." });
    }
};
