import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/hooks/use-session";
import { Progress } from "@/components/ui/progress";

export const WhitelistBarebonesActionsStatus = () => {
	const { username: sessionUsername } = useSession();
	const [totalPoints, setTotalPoints] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchPointsForAction = useCallback(
		async (action: string): Promise<number> => {
			if (!sessionUsername) return 0;

			const API_URL: string = import.meta.env.VITE_BACK_END_URL;
			const API_KEY: string = import.meta.env.VITE_API_KEY;

			try {
				const response = await fetch(
					`${API_URL}/api/user-action-points/${sessionUsername}?from_action=${encodeURIComponent(
						action
					)}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${API_KEY}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				return data.totalPoints || 0;
			} catch (error) {
				console.error(`Error fetching points for action ${action}:`, error);
				return 0;
			}
		},
		[sessionUsername]
	);

	useEffect(() => {
		const actions = [
			"whitelist-1",
			"change_profile_picture",
			"twitter-status-update",
			"change_banner",
			"change_bio",
		];
		let isMounted = true;

		const fetchAndUpdatePoints = async () => {
			try {
				const pointsArray = await Promise.all(
					actions.map((action) => fetchPointsForAction(action))
				);
				const total = pointsArray.reduce((acc, points) => acc + points, 0);

				if (isMounted && total !== totalPoints) {
					setTotalPoints(total);
				}
			} catch (error) {
				console.error("Error fetching action points:", error);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchAndUpdatePoints();

		const intervalId = setInterval(fetchAndUpdatePoints, 5000);

		return () => {
			isMounted = false;
			clearInterval(intervalId);
		};
	}, [fetchPointsForAction, totalPoints]);

	if (isLoading) return <p>Loading...</p>;

	return (
		<div
			id="whitelist-preview"
			className="space-y-2 mx-auto rounded-2xl bg-black border border-green-500 bg-opacity-70 p-8 flex flex-col items-center justify-center w-full mb-6 backdrop-filter backdrop-blur text-center"
		>
			<h1 className="text-xl font-medium text-emerald-500">
				VIP AIRDROP points...
			</h1>
			<p className="text-md pt-4 text-sm text-emerald-500">
				{`${totalPoints} / 300 points progress towards whitelist`}
			</p>
			<Progress value={totalPoints ? (totalPoints / 300) * 100 : 0} />
			<p className="text-md pt-4 text-sm text-emerald-500">
				More actions coming soon...
			</p>
		</div>
	);
};
