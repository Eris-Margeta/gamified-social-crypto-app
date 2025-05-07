import { uniqueUsernameGenerator, Config } from "unique-username-generator";
import { checkUsernameExists } from "./duplicate-username-checker";
import fs from "fs";
import path from "path";

const loadWordsFromCSV = async (filePath: string): Promise<string[]> => {
	const content = await fs.promises.readFile(filePath, "utf8");
	return content.split("\n").filter(Boolean);
};

const sanitizeUsername = (username: string): string => {
	return username.replace(/[^a-zA-Z0-9_]/g, "_");
};

export const generateCustomUsername = async (): Promise<string> => {
	const wordsPath = path.resolve(__dirname, "../../words.csv");
	const words = await loadWordsFromCSV(wordsPath);

	const customDictionaries = [words];
	const config: Config = {
		dictionaries: customDictionaries,
		separator: "-",
		style: "lowerCase",
		randomDigits: 2,
		length: 40,
	};

	let uniqueUsername = "";
	let isUnique = false;

	while (!isUnique) {
		uniqueUsername = uniqueUsernameGenerator(config);

		isUnique = !(await checkUsernameExists(uniqueUsername));
	}

	return sanitizeUsername(uniqueUsername);
};
