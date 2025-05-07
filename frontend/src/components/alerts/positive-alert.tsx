import { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useFetchUserData } from "@/hooks/use-fetch-user-data";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface PositiveAlertProps {
	onClose: () => void;
}

export const PositiveAlert = ({ onClose }: PositiveAlertProps) => {
	const { getBooleanItem, setItem } = useLocalStorage();
	const { userData, isLoading } = useFetchUserData();

	const [isVisible, setIsVisible] = useState(
		() => !getBooleanItem("positive-alert-closed-status", false)
	);

	useEffect(() => {
		const alertClosedStatus = getBooleanItem(
			"positive-alert-closed-status",
			false
		);
		setIsVisible(!alertClosedStatus);
	}, [getBooleanItem]);

	const handleClose = () => {
		setIsVisible(false);
		setItem("positive-alert-closed-status", true);
		setTimeout(onClose, 500);
	};

	let referrerDisplay = "Loading...";
	if (!isLoading && userData) {
		referrerDisplay = userData.referrer
			? userData.referrer
			: "Nobody, you're at the HELM";
	}

	if (!isVisible) return null;

	return (
		<div
			className={`rounded-2xl bg-black border border-green-500 bg-opacity-70 p-8 flex flex-col items-start top-0 w-full h-full mb-6 backdrop-filter backdrop-blur ${
				isVisible ? "alert-visible" : "alert-hidden"
			}`}
		>
			<div className="flex justify-between w-full mx-auto">
				<div className="flex ">
					<div className="flex-shrink-0">
						<CheckCircleIcon
							className="h-5 w-5 text-green-500"
							aria-hidden="true"
						/>
					</div>
					<div className="ml-3 mx-auto ">
						<h3 className="text-lg font-medium text-emerald-500">
							Congrats! Now, add your SOLANA wallet and get whitelisted.
						</h3>
						<p className="text-md pt-4 font-medium text-emerald-500">
							Become a part of MIDNIGHT and get <u>LIFETIME AIRDROPS</u>
						</p>

						<p className="text-md pt-4 font-medium text-emerald-500"> </p>
						<div className="mt-2 text-sm text-emerald-600 break-words">
							<span className="text-lg font-semibold">
								Referred By: {referrerDisplay}
							</span>
							<button
								onClick={handleClose}
								className="animate-glow text-white font-bold py-4 mt-6 mb-2 px-4 rounded-md focus:outline-none focus:shadow-outline mx-auto block bg-emerald-600 hover:bg-emerald-700 transition-colors"
							>
								I am READY!✨
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
