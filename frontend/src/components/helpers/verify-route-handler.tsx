import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useSession } from "@/hooks/use-session";

export const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSessionID } = useSession()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionID = searchParams.get("sessionID");

    if (!sessionID) {
      console.error("SessionID is null or not found in URL.");
      navigate("/");
      return;
    }

    const verifySession = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACK_END_URL}/api/authorize`,
          { sessionID },
          {
            withCredentials: true,
          }
        );

        Cookies.set("sessionID", sessionID, { expires: 365 });
        setSessionID(sessionID);
        window.location.href = "/";
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/error");
      }
    };

    verifySession();
  }, [navigate, location, setSessionID]);

  return <div className="text-center">Verifying...</div>;
};
