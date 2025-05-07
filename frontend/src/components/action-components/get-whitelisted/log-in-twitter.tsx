import { useContext } from "react";
import { Button } from "@/components/catalyst/button";
import { SessionContext } from "@/contexts/session-context";
import { useAlert } from "@/contexts/alert-context";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const LoginWithTwitterButton = () => {
	const { username } = useContext(SessionContext);
	const { showAlert } = useAlert();
	const { setItem } = useLocalStorage();

	const handleLoginWithTwitter = () => {
		const magicLink = `https://app.midnightapes.com/?${username}`;
		const authUrl = `https://twitterbot-silven-nftalk.replit.app/authenticate?username=${username}&magic_link=${encodeURIComponent(
			magicLink
		)}`;

		showAlert(
			"You will be redirected",
			"The app will open a new tab, please finish logging in to twitter and return to your dashboard.",
			() => window.open(authUrl, "_blank")
		);

		setItem("twitter-login-button-pressed-on-device", true);
	};

	return (
		<Button color="cyan" onClick={handleLoginWithTwitter}>
			Log In With Twitter
		</Button>
	);
};
