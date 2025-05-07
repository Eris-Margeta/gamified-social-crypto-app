import { useContext } from "react";
import { LocalStorageContext } from "../contexts/state-local-storage-context";

export const useLocalStorage = () => {
	const context = useContext(LocalStorageContext);
	if (!context) {
		throw new Error(
			"useLocalStorage must be used within a LocalStorageProvider"
		);
	}

	const parseBooleanFromString = (value: string): boolean => {
		return value === "true";
	};

	const getBooleanItem = (key: string, defaultValue: boolean): boolean => {
		const item = context.getItem(key, JSON.stringify(defaultValue));
		return parseBooleanFromString(item);
	};

	const setItem = <T>(key: string, value: T) => {
		const valueToStore = JSON.stringify(value);
		context.setItem(key, valueToStore);
	};

	const getItem = <T>(key: string, defaultValue: T): T => {
		const item = context.getItem(key, JSON.stringify(defaultValue));
		try {
			const parsedItem = JSON.parse(item);
			if (
				typeof parsedItem === "string" &&
				(parsedItem === "true" || parsedItem === "false")
			) {
				return parseBooleanFromString(parsedItem) as unknown as T;
			}
			return parsedItem;
		} catch (error) {
			console.error(`Error parsing ${key} from localStorage`, error);
			return defaultValue;
		}
	};

	return { setItem, getItem, getBooleanItem };
};
