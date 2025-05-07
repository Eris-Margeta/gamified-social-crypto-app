import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const apiKey = process.env.MAILERSEND_API_KEY;
if (!apiKey) {
  throw new Error("MAILERSEND_API_KEY is not defined in the environment variables.");
}

const mailerSend = new MailerSend({ apiKey });

export const sendVerificationEmail = async (recipientEmail: string, validationCode: string): Promise<string> => {
  try {
    const sentFrom = new Sender("noreply@noreply.midnightapes.com", "Midnight Apes");
    const recipients = [new Recipient(recipientEmail, "Recipient Name")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Your Verification Code")
      .setHtml(`
        <p><strong>Your verification code is:</strong></p>
        <p style="font-size: 16px; font-weight: bold;">${validationCode}</p>
        <p>Please copy this code and paste it into the verification field to continue.</p>
      `)
      .setText(`
        Your verification code is: ${validationCode}
        Please copy this code and paste it into the verification field to continue.
      `);

    await mailerSend.email.send(emailParams);
    return "Email has been sent";
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return "Error, too many emails sent, try again later";
  }
};
