import { useCallback } from "react";
import Cookies from "js-cookie";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/components/ui/use-toast";

interface AddPointsProps {
	points: number;
	fromAction: string;
	isUnique?: boolean;
}

export const useAddPoints = () => {
	const { username: sessionUsername } = useSession();
	const { toast } = useToast();
	const username = sessionUsername || Cookies.get("username");

	const addPoints = useCallback(
		async ({ points, fromAction, isUnique = false }: AddPointsProps) => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BACK_END_URL}/api/add-points`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
						},
						body: JSON.stringify({
							username,
							points,
							from_action: fromAction,
							isUnique,
						}),
					}
				);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				if (data.message) {
					console.log(data.message);
					toast({
						title: "Success",
						description: data.message,
					});
				} else if (data.warning) {
					console.warn(data.warning);
					toast({
						variant: "destructive",
						title: "Notice",
						description: data.warning,
					});
				}
			} catch (error) {
				console.error("Error adding points:", error);
				toast({
					variant: "destructive",
					title: "Error",
					description:
						error instanceof Error
							? error.message
							: "An error occurred while adding points",
				});
			}
		},
		[username, toast]
	);

	return addPoints;
};
