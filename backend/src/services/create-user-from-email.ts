import { writeToDb, updateUserReferrer, createUserTable } from "./db-writer";
import { encrypt } from "../process-data-handler-components/email-encryptor";
import { generateRandomString } from "../utils/generate-random-string";
import { generateCustomUsername } from "./username-generator";
import { parseReferrerLink } from "./parse-referrer-link";
import { createMagicLink } from "./magic-link-creator";

interface UserCreationData {
    email: string;
    referrerlink: string;
    ip: string;
    isWhitelisted?: boolean;
    web3address?: string;
    ownsnft?: boolean;
}

export const createUserFromEmail = async ({
    email,
    referrerlink,
    ip,
    isWhitelisted = false, 
    web3address = '',
    ownsnft = false, 
}: UserCreationData): Promise<{
    success: boolean;
    username?: string;
    sessionID?: string;
    message: string;
    magicLink?: string;
}> => {
    const username = await generateCustomUsername();
    const encryptedEmail = encrypt(email);
    const sessionID = `${encryptedEmail}-${generateRandomString(6)}`;
    const referrerUsername = parseReferrerLink(referrerlink);
    const magicLink = createMagicLink(username); 

    const record = {
        username,
        referrer: referrerUsername, 
        referrerlink,
        referrerUsername: referrerUsername,
        newUser: email,
        newUserID: encryptedEmail,
        sessionID,
        userIP: ip || "unknown IP",
        timestamp: new Date().toISOString(),
        isWhitelisted,
        web3address,
        ownsnft,
        magicLink,
    };

    try {
        await writeToDb(record);
        await createUserTable(username);

       
        if (referrerUsername) {
            await updateUserReferrer(email, referrerUsername);
        }

        return {
            success: true,
            username,
            sessionID,
            message: "User created successfully.",
            magicLink,
        };
    } catch (error) {
        console.error("Error creating user:", error);
        return {
            success: false,
            message: "Error creating user.",
        };
    }
};
