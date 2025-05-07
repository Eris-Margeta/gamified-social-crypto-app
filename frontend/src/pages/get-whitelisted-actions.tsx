import { useState, useEffect } from "react";
import { WhitelistBarebonesActionsStatus } from "@/components/action-components/whitelist-barebones-statuscard";

import { LoginWithTwitterButton } from "@/components/action-components/get-whitelisted/log-in-twitter";
import { TwitterActionStatus } from "@/components/action-components/get-whitelisted/twitter-action-status";
import { TwitterActionProfilePic } from "@/components/action-components/get-whitelisted/twitter-action-profilepic";
import { TwitterActionBanner } from "@/components/action-components/get-whitelisted/twitter-action-banner";
import { TwitterActionBio } from "@/components/action-components/get-whitelisted/twitter-action-bio";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ConnectButton } from "@/components/action-components/get-whitelisted/web3modal";

export const GetWhitelistedActions = () => {
	const { getBooleanItem } = useLocalStorage();
	const [isTwitterLoginAttempted, setIsTwitterLoginAttempted] = useState(false);

	useEffect(() => {
		const loginAttempted = getBooleanItem(
			"twitter-login-button-pressed-on-device",
			false
		);
		setIsTwitterLoginAttempted(loginAttempted);
	}, [getBooleanItem]);

	return (
		<div className="flex flex-col pt-8 lg:max-w-lg md:px-12 w-full px-4 mx-auto">
			<div
				className="overflow-auto w-full flex flex-col space-y-8 pl-6 pr-6 mr-1 ml-1 mx-auto"
				style={{ maxHeight: "calc(100vh - 10rem)" }}
			>
				<WhitelistBarebonesActionsStatus />
				<ConnectButton />
				<LoginWithTwitterButton />
				{isTwitterLoginAttempted && (
					<>
						<TwitterActionStatus />
						<TwitterActionProfilePic />
						<TwitterActionBanner />
						<TwitterActionBio />
					</>
				)}
				<div className="pb-8"></div>
			</div>
		</div>
	);
};
