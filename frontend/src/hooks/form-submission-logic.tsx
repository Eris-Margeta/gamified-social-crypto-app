import { useState } from "react";

export const useEmailSubmission = (
	onSetErrors: (errors: string[]) => void,
	onEmailSubmitted: (email: string) => void
) => {
	const [email, setEmail] = useState("");
	const [isWaiting, setIsWaiting] = useState(false);

	const sendEmailData = async (
		currentUrl: string,
		userEmail: string,
		userIP: string
	) => {
		setIsWaiting(true);

		const API_URL = import.meta.env.VITE_BACK_END_URL;
		const API_KEY = import.meta.env.VITE_API_KEY;

		try {
			const response = await fetch(`${API_URL}/process-data`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${API_KEY}`,
				},
				body: JSON.stringify({ email: userEmail, url: currentUrl, ip: userIP }),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`HTTP error! status: ${response.status}, body: ${errorText}`
				);
			}

			onSetErrors([]);
			onEmailSubmitted(userEmail);
		} catch (error) {
			console.error("Error sending data", error);
			onSetErrors([
				"Error sending data. Please try again.",
				error instanceof Error ? error.message : "Unknown error",
			]);
		}
	};

	return { email, setEmail, sendEmailData, isWaiting };
};
