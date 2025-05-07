import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAddPoints } from "@/services/add-points";
import { useSession } from "@/hooks/use-session";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

export function ConnectButton() {
	const { address, isConnected } = useAccount();
	const addPoints = useAddPoints();
	const { username: sessionUsername } = useSession();
	const username = sessionUsername || Cookies.get("username");
	const { toast } = useToast();
	const { getBooleanItem, setItem } = useLocalStorage();

	useEffect(() => {
		const handleAddPointsAndUpdateAddress = async () => {
			const hasConnectedWallet = getBooleanItem(
				"user-connected-wallet-to-device",
				false
			);

			if (isConnected && address && username && !hasConnectedWallet) {
				const backendUrl = import.meta.env.VITE_BACK_END_URL;
				const API_KEY = import.meta.env.VITE_API_KEY;

				try {
					const response = await fetch(
						`${backendUrl}/api/user-data/${username}`,
						{
							method: "PATCH",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${API_KEY}`,
							},
							body: JSON.stringify({
								web3address: address,
							}),
						}
					);

					if (!response.ok) {
						const errorText = await response.text();
						toast({
							variant: "destructive",
							title: "Web3 failed",
							description: `Contact support. Server responded with: ${errorText}`,
						});
						throw new Error(
							`Failed to update web3 address. Server responded with: ${errorText}`
						);
					}

					toast({
						title: "Success",
						description: "Web3 address updated successfully!",
					});

					await addPoints({
						points: 100,
						fromAction: "whitelist-1",
						isUnique: true,
					});

					setItem("user-connected-wallet-to-device", true);
				} catch (error) {
					const errorMessage =
						error instanceof Error
							? error.message
							: "An unexpected error occurred";
					console.error(errorMessage);

					toast({
						variant: "destructive",
						title: "Error",
						description: errorMessage,
					});
				}
			}
		};

		handleAddPointsAndUpdateAddress();
	}, [
		isConnected,
		address,
		username,
		addPoints,
		toast,
		getBooleanItem,
		setItem,
	]);

	return <w3m-button />;
}
