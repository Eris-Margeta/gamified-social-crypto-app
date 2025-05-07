import { useEffect } from "react";
import Cookies from "js-cookie";

const useFetchUsername = () => {
    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 3;
        const interval = 2000; 

        const fetchData = async () => {
            const username = Cookies.get("username");
            if (username) {
                console.log("Username already in cookies:", username);
                return;
            }

            const backEndUrl = import.meta.env.VITE_BACK_END_URL;
            const sessionID = Cookies.get("sessionID");
            if (!sessionID) {
                console.log("SessionID not found, stopping fetch attempts.");
                return; 
            }
            console.log("SessionID for debugging:", sessionID);

            try {
                const response = await fetch(
                    `${backEndUrl}/api/username-by-session/${sessionID}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    Cookies.set("username", data.username);
                    console.log("Username fetched and stored:", data.username);
                    return; 
                } else {
                    console.error("Error fetching username: HTTP status", response.status);
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }

          
            if (attempts < maxAttempts) {
                setTimeout(fetchData, interval);
                attempts += 1;
            } else {
        
                Cookies.set("username", "not found");
                console.log("Max attempts reached, username set to 'not found'.");
            }
        };

        fetchData();
    }, []);
};

export default useFetchUsername;
