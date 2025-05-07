import { Request, Response } from "express";
import { checkUserExists } from "./services/user-existence-checker";
import { createUserFromEmail } from "./services/create-user-from-email";
import { fetchSessionIdByEmail } from "./services/get-session-id-from-email";
import { sendVerificationEmail } from "./services/email-sender";
import { getValidationCode } from "./services/code-admin"; 


export const processDataHandler = async (req: Request, res: Response) => {
    const { url, email, ip } = req.body;
    const frontEndUrl = process.env.FRONT_END_URL || "http://localhost:3000";
    const emailSendingEnabled = process.env.EMAIL_SENDING_ENABLED === 'true'; 

    if (!email) {
        return res.status(400).json({ error: "Missing EMAIL in request" });
    }

    const userExists = await checkUserExists(email);
    if (userExists) {
        console.log("User already exists");
        const sessionID = await fetchSessionIdByEmail(email);
        const verificationUrl = `${frontEndUrl}/verify?sessionID=${sessionID}`;

        if (process.env.DEVELOPMENT === "true") {
            console.log(`Verification URL for existing user: ${verificationUrl}`);
        }

        if (emailSendingEnabled) { 
            const validationCode = getValidationCode();
            const emailStatus = await sendVerificationEmail(email, validationCode);
            console.log(emailStatus);
            return res.status(200).json({ message: "User already exists.", emailStatus });
        }

        return res.status(200).json({ message: "User already exists." });
    } else {
        const creationResult = await createUserFromEmail({
            email,
            referrerlink: url ? url : "no referrer",
            ip,
        });
        if (creationResult.success) {
            const verificationUrl = `${frontEndUrl}/verify?sessionID=${creationResult.sessionID}`;

            if (process.env.DEVELOPMENT === "true") {
                console.log(`Verification URL for new user: ${verificationUrl}`);
            }

            if (emailSendingEnabled) { 
                const validationCode = getValidationCode(); 
                const emailStatus = await sendVerificationEmail(email, validationCode); 
                console.log(emailStatus);
                return res.status(200).json({ message: creationResult.message, emailStatus });
            }

            return res.status(200).json({ message: creationResult.message, verificationUrl });
        } else {
            return res.status(500).json({ error: creationResult.message });
        }
    }
};
