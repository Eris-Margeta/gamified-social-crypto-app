import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface SessionContextType {
  sessionID: string | null;
  setSessionID: (sessionID: string | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
}

const defaultContextValue: SessionContextType = {
  sessionID: null,
  setSessionID: () => {},
  username: null,
  setUsername: () => {},
};

export const SessionContext = createContext<SessionContextType>(defaultContextValue);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [sessionID, setSessionID] = useState<string | null>(Cookies.get('sessionID') || null);
    const [username, setUsername] = useState<string | null>(Cookies.get('username') || null);

    useEffect(() => {
        if (sessionID) {
            Cookies.set('sessionID', sessionID, { expires: 365 });
            if (import.meta.env.DEVELOPMENT) {
                console.log('Session ID set/updated:', sessionID);
            }
        }
    }, [sessionID]);

    useEffect(() => {
        const fetchUsername = async () => {
            if (!username && sessionID) {
                const backEndUrl = import.meta.env.VITE_BACK_END_URL;
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
                        setUsername(data.username);
                        Cookies.set("username", data.username);
                        console.log("Username fetched and stored:", data.username);
                    } else {
                        console.error("Error fetching username: HTTP status", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching username:", error);
                }
            }
        };

        fetchUsername();
    }, [sessionID, username]);

    return (
        <SessionContext.Provider value={{ sessionID, setSessionID, username, setUsername }}>
            {children}
        </SessionContext.Provider>
    );
};


