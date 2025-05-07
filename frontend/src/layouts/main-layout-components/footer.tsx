import { useEffect, useState } from "react";
import { Nuke } from "@/components/helpers/nuke";
import { useFetchPoints } from "@/hooks/use-fetch-points";
import { useSession } from "@/hooks/use-session";

export const Footer = () => {
	const { username } = useSession();
	const {
		points,
		isLoading: isLoadingPoints,
		error: errorPoints,
	} = useFetchPoints();
	const [isLoadingUserData, setIsLoadingUserData] = useState(true);
	const [errorUserData, setErrorUserData] = useState<string | null>(null);

	useEffect(() => {
		if (username) {
			setIsLoadingUserData(false);
			setErrorUserData(null);
		} else {
			setIsLoadingUserData(false);
			setErrorUserData("Username not available");
		}
	}, [username]);

	if (errorPoints) {
		console.error("Error fetching points:", errorPoints);
	}

	if (errorUserData) {
		console.error("Error fetching user data:", errorUserData);
	}

	return (
		<footer className="sticky bottom-0 h-min w-full rounded-b-xl flex flex-row items-center justify-center text-white bg-zinc-900 shadow-sm forced-colors:outline z-50 mt-auto">
			<div className="p-4 w-full align-middle py-auto my-auto flex justify-between items-center h-min">
				<div>
					<span className="text-md font-semibold py-2 text-zinc-400">
						Your Username:
					</span>
					<p className="break-all text-xs text-zinc-400">
						{isLoadingUserData
							? "Fetching..."
							: errorUserData
							? errorUserData
							: username || "Not available"}
					</p>
				</div>
				<div>
					<span className="text-md font-semibold py-2 text-zinc-400">
						Your Points:
					</span>
					<p className="break-all text-xs text-zinc-400">
						{isLoadingPoints
							? "Fetching..."
							: errorPoints
							? "Error fetching points"
							: points}
					</p>
					<span className="text-md font-semibold py-2 text-zinc-400">
						Is WHITELISTED:
					</span>
				</div>
				<Nuke />
			</div>
		</footer>
	);
};
