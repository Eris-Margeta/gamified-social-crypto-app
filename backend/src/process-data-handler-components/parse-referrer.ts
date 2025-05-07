import { decrypt } from "./email-encryptor";

export const parseReferrer = (url: string): string => {
	try {
		const urlObj = new URL(url);
		const urlQuery = urlObj.search;

		if (urlQuery) {
			const queryWithoutQuestionMark = urlQuery.slice(1);
			const decryptedQuery = decrypt(queryWithoutQuestionMark);

			if (
				[
					"Invalid format for decryption",
					"Invalid IV length for decryption",
					"Decryption failed",
				].includes(decryptedQuery)
			) {
				return urlQuery;
			} else {
				return decryptedQuery;
			}
		}
	} catch (error) {
		console.error("URL parsing error:", error);
		return "Invalid URL format";
	}

	return "no referrer";
};
