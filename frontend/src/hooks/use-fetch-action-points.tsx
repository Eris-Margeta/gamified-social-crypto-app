import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { SessionContext } from "../contexts/session-context";

interface FetchActionPointsResponse {
	username: string;
	from_action: string;
	totalPoints: number;
}

export const useFetchActionPoints = (fromAction: string) => {
	const [points, setPoints] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { username: sessionUsername } = useContext(SessionContext);

	useEffect(() => {
		const fetchActionPoints = async () => {
			const username = sessionUsername || Cookies.get("username");
			if (!username) {
				console.log("Username not found, retrying...");

				setIsLoading(true);
				return;
			}

			const API_URL = import.meta.env.VITE_BACK_END_URL;
			const API_KEY = import.meta.env.VITE_API_KEY;

			try {
				const response = await fetch(
					`${API_URL}/api/user-action-points/${username}?from_action=${encodeURIComponent(
						fromAction
					)}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${API_KEY}`,
						},
					}
				);

				if (!response.ok) {
					console.error(`HTTP error! status: ${response.status}, retrying...`);
          return;
				}

				const data: FetchActionPointsResponse = await response.json();
				setPoints(data.totalPoints);
			} catch (error) {
        console.error("An error occurred while fetching action points, retrying...", error);

			} finally {
				setIsLoading(false);
			}
		};

		fetchActionPoints();

		const intervalId = setInterval(fetchActionPoints, 5000);

		return () => clearInterval(intervalId);
	}, [sessionUsername, fromAction]);

	return { points, isLoading };
};
