import { createContext, useState, useEffect, ReactNode } from "react";
import { checkAuthStatus } from "../services/auth-checking-service";

export interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
}

const defaultContextValue: AuthContextType = {
	isAuthenticated: false,
	isLoading: true,
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		defaultContextValue.isAuthenticated
	);
	const [isLoading, setIsLoading] = useState<boolean>(
		defaultContextValue.isLoading
	);

	useEffect(() => {
		const verifyAuth = async () => {
			if (import.meta.env.VITE_DEVELOPMENT_AUTH_MOCK === "TRUE") {
				console.log(
					"Development Auth Mock enabled - user is authenticated by default"
				);
				setIsAuthenticated(true);
				setIsLoading(false);
				return;
			}

			try {
				const status: boolean = await checkAuthStatus();
				setIsAuthenticated(status);
			} catch (error) {
				console.error("Failed to verify auth status:", error);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		verifyAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
