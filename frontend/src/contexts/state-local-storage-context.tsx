import { createContext, ReactNode } from "react";

interface LocalStorageContextType {
	setItem: (key: string, value: string) => void;
	getItem: (key: string, defaultValue: string) => string;
}

const defaultContextValue: LocalStorageContextType = {
	setItem: (key: string, value: string) => {
		window.localStorage.setItem(key, value);
	},
	getItem: (key: string, defaultValue: string): string => {
		const item = window.localStorage.getItem(key);
		return item ?? defaultValue;
	},
};

export const LocalStorageContext =
	createContext<LocalStorageContextType>(defaultContextValue);

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
	return (
		<LocalStorageContext.Provider value={defaultContextValue}>
			{children}
		</LocalStorageContext.Provider>
	);
};
