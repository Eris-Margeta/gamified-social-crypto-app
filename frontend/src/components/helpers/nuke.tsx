import axios from "axios";
import Cookies from "js-cookie";

export const Nuke = () => {
	const handleNuke = async () => {
		localStorage.clear();

		Cookies.remove("sessionID");

		Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));

		const BACK_END_URL = import.meta.env.VITE_BACK_END_URL;

		try {
			const response = await axios.post(
				`${BACK_END_URL}/api/clear-session`,
				{},
				{ withCredentials: true }
			);
			console.log("Server-side session cleared", response.data);
		} catch (error) {
			console.error("Failed to clear server-side session:", error);
		}

		window.location.href = "/";
	};

	return (
		<button
			onClick={handleNuke}
			style={{
				padding: "10px",
				marginTop: "20px",
				cursor: "pointer",
				backgroundColor: "red",
				color: "white",
			}}
		>
			Reset App
		</button>
	);
};
