// @ts-nocheck
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useErrorHandling } from "../../../hooks/error-handling";
import { Button } from "@/components/catalyst/button";
import { useAddPoints } from "@/services/add-points";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/components/ui/use-toast";

export const Web3Button = () => {
	const { setErrors } = useErrorHandling([]);
	const addPoints = useAddPoints();
	const { username: sessionUsername } = useSession();

	const API_KEY_PAYPANGEA = import.meta.env.VITE_PAYPANGEA_KEY;
	const ENVIRONMENT_PAYPANGEA = import.meta.env.VITE_PAYPANGEA_ENVIRONMENT;
	const payPangeaRef = useRef(null);
	const username = sessionUsername || Cookies.get("username");
	const { toast } = useToast();

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.paypangea.com/sdk.js?ver=4";
		document.body.appendChild(script);
		script.onload = () => initializePayPangea();
		console.log("PayPangea SDK script loaded");

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const initializePayPangea = () => {
		console.log("Initializing PayPangea");
		payPangeaRef.current = new PayPangea({
			apiKey: API_KEY_PAYPANGEA,
			environment: ENVIRONMENT_PAYPANGEA,
		});

		const logEvent = (event) => (data) => {
			console.log(`Event '${event}' received from PayPangea`, data);
		};

		const events = ["success", "error", "cancel", "update"];
		events.forEach((event) => {
			payPangeaRef.current.on(event, logEvent(event));
		});

		payPangeaRef.current.on("success", (data) => {
			console.log("Login was successful with PayPangea", data);
			if (data.outcome.code === 200) {
				handleGetWhitelisted(data.outcome.wallet);
			} else {
				// Handle errors from PayPangea login
				setErrors(["Failed to login with PayPangea. Please try again."]);
			}
		});
	};

	const payPangeaClick = (event) => {
		event.preventDefault();
		if (payPangeaRef.current) {
			payPangeaRef.current.showLogin({});
		}
	};

	const handleGetWhitelisted = async (wallet) => {
		try {
			const backendUrl = import.meta.env.VITE_BACK_END_URL;
			const API_KEY = import.meta.env.VITE_API_KEY;

			const response = await fetch(`${backendUrl}/api/user-data/${username}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${API_KEY}`,
				},
				body: JSON.stringify({
					web3address: wallet,
				}),
			});

			if (response.ok) {
				console.log("Success: You are 1/3 of the way there!");
				toast({
					title: "Success",
					description: "Make sure to finish the action to get points,",
				});
				addPoints({ points: 100, fromAction: "whitelist-1", isUnique: true });
			} else {
				const errorText = await response.text();
				toast({
					variant: "destructive",
					title: "Web3 failed",
					description: `Contact support. Server responded with: ${errorText}`,
				});
				throw new Error(
					`Whitelist failed - contact support. Server responded with: ${errorText}`
				);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unexpected error occurred";
			console.error(errorMessage);
			setErrors([errorMessage]);
			localStorage.setItem("lastError", errorMessage);
		}
	};

	return (
		<Button
			onClick={payPangeaClick}
			className="flex flex-col items-center justify-center animate-glow text-white font-bold py-12 px-4 rounded focus:outline-none focus:shadow-outline"
		>
			<span className="block text-2xl text-gray-100 mb-2">
				Connect to Web3 / Create Wallet
			</span>
			<span className="block text-sm text-gray-400 mb-1">
				If you already have a wallet - click "WalletConnect"
			</span>
			<span className="block text-sm text-gray-400">
				If you want to create a wallet - click "Log in with..."
			</span>
		</Button>
	);
};
