import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import loadingGif from "@/assets/loading.gif";

export const LoadingIndicator = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkLoadingCookies = () => {
			const cookies = Cookies.get();
			const loadingCookieFound = Object.keys(cookies).some((key) =>
				key.startsWith("loading")
			);
			setIsLoading(loadingCookieFound);
		};

		checkLoadingCookies();

		const interval = setInterval(checkLoadingCookies, 100);

		return () => clearInterval(interval);
	}, []);

	if (!isLoading) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
			<div className="w-[20vh]">
				<img src={loadingGif} alt="Loading..." />
			</div>
		</div>
	);
};
