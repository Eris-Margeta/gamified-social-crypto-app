import crypto from "crypto";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY ||
  "encryptionkey12498444";
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  const keyBuffer = Buffer.from(ENCRYPTION_KEY, "hex");
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + "-" + encrypted;
}

export function decrypt(text: string): string {
  try {
    const textParts = text.split("-");
    if (textParts.length < 2) {
      throw new Error("Invalid format for decryption");
    }

    const iv = Buffer.from(textParts.shift()!, "hex");
    if (iv.length !== IV_LENGTH) {
      throw new Error("Invalid IV length for decryption");
    }

    const encryptedText = Buffer.from(textParts.join("-"), "hex");
    const keyBuffer = Buffer.from(ENCRYPTION_KEY, "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);
    let decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch (error) {
    console.error("Decryption failed", error);
    return "Decryption failed";
  }
}
