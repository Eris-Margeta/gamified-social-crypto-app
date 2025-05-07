
import { useState, useEffect } from "react";
import { PositiveAlert } from "@/components/alerts/positive-alert";
import { NegativeAlert } from "@/components/alerts/negative-alert";
import { useErrorHandling } from "@/hooks/error-handling";
import { GetWhitelistedActions } from "@/pages/get-whitelisted-actions";
import { DailyActions } from "@/pages/daily-actions";
import { Button } from "@/components/catalyst/button";
import {
	Drawer,
	DrawerContent,
	DrawerClose,
} from "@/components/ui/custom-drawer";
import { WhitelistActionsStatus } from "./action-components/whitelist-action-statuscard";
import { MiniLayout } from "@/layouts/mini-layout";
import { GetWhitelistedPageButton } from "./action-components/get-whitelisted/get-whitelisted-page-button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MagicLinkDisplay } from "./magic-link-display";

export const ActionsPage = () => {
	const { errors, isVisible } = useErrorHandling([]);
	const { setItem, getBooleanItem } = useLocalStorage();

	const [isGetWhitelistedDrawerOpen, setIsGetWhitelistedDrawerOpen] =
		useState(false);
	const [isDailyActionsDrawerOpen, setIsDailyActionsDrawerOpen] =
		useState(false);

	useEffect(() => {
		const alertPreviouslyClosed = getBooleanItem(
			"positive-alert-closed-status",
			false
		);
		const whitelistedDrawerOpen = getBooleanItem(
			"isGetWhitelistedDrawerOpen",
			false
		);
		const dailyActionsDrawerOpen = getBooleanItem(
			"isDailyActionsDrawerOpen",
			false
		);

		setAlertClosed(alertPreviouslyClosed);
		setIsGetWhitelistedDrawerOpen(whitelistedDrawerOpen);
		setIsDailyActionsDrawerOpen(dailyActionsDrawerOpen);
	}, [getBooleanItem]);

	const [alertClosed, setAlertClosed] = useState(false);

	const handleAlertClose = () => {
		setAlertClosed(true);
		setItem("positive-alert-closed-status", true);
	};

	//const openGetWhitelistedDrawer = () => {
	//	setIsGetWhitelistedDrawerOpen(true);
	//	setItem("isGetWhitelistedDrawerOpen", true);
//	};
	const closeGetWhitelistedDrawer = () => {
		setIsGetWhitelistedDrawerOpen(false);
		setItem("isGetWhitelistedDrawerOpen", false);
	};
	const openDailyActionsDrawer = () => {
		setIsDailyActionsDrawerOpen(true);
		setItem("isDailyActionsDrawerOpen", true);
	};
	const closeDailyActionsDrawer = () => {
		setIsDailyActionsDrawerOpen(false);
		setItem("isDailyActionsDrawerOpen", false);
	};

	// changed get whitelisted button to show form page
	// TODO add actions to daily actions
	// change get whitelisted quest bullshit shit

	return (
		<MiniLayout>
			<div className="flex flex-col pt-8 w-full max-w-screen-lg fade-in-form px-4 md:px-12 mx-auto lg:px-[20vw] xl:px-[10vw]">
				{!alertClosed ? (
					<PositiveAlert onClose={handleAlertClose} />
				) : (
					<>
						<div className="flex flex-col space-y-8 lg:max-w-lg md:px-12 w-full mx-auto">
							{isVisible && <NegativeAlert errors={errors} />}
							<WhitelistActionsStatus />

							<GetWhitelistedPageButton
								onClick={() =>
									window.open("https://form.midnightapes.com", "_blank")
								}
							>
								🌑 ✨ GET WHITELISTED
							</GetWhitelistedPageButton>

							<Button onClick={openDailyActionsDrawer}>Daily Actions ✅</Button>
							<Button
								color="pink"
								onClick={() =>
									window.open("https://midnightapes.com", "_blank")
								}
							>
								Visit HOMEPAGE
							</Button>

							<MagicLinkDisplay />
						</div>
					</>
				)}
			</div>

			{/* Drawer for Get Whitelisted Actions */}
			<div className="mt-24 overflow-visible z-50">
				<Drawer
					isOpen={isGetWhitelistedDrawerOpen}
					onClose={closeGetWhitelistedDrawer}
				>
					<DrawerContent>
						<GetWhitelistedActions />
						<DrawerClose onClick={closeGetWhitelistedDrawer}>
							<Button className="w-full" outline>
								Close
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
			</div>

			{/* Drawer for Daily Actions */}
			<div className="mt-24 overflow-visible z-50">
				<Drawer
					isOpen={isDailyActionsDrawerOpen}
					onClose={closeDailyActionsDrawer}
				>
					<DrawerContent>
						<DailyActions />
						<DrawerClose onClick={closeDailyActionsDrawer}>
							<Button className="w-full" outline>
								Close
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
			</div>
		</MiniLayout>
	);
};
