import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/catalyst/button";
import { useSession } from "@/hooks/use-session";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useAlert } from "@/contexts/alert-context";

export const TwitterActionBio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useSession();
  const { getBooleanItem, setItem } = useLocalStorage();
  const { showAlert } = useAlert();


  const isSuccess = getBooleanItem("twitter-action-bio-success", false);

  const checkActionPoints = useCallback(async () => {
    if (!username) return;

    const actionName = "change_bio";
    const endpoint = `https://api.midnightapes.com/api/user-action-points/${username}?from_action=${actionName}`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      const data = await response.json();


      const totalPoints = data.totalPoints;

      if (totalPoints >= 100) {
        setItem("twitter-action-bio-success", true);
      }
    } catch (error) {
      console.error("Error fetching action bio points:", error);
    }
  }, [username, setItem]);

  useEffect(() => {
    if (import.meta.env.VITE_DEVELOPMENT === "true") {
      console.log(`Username from twitter-action-bio: ${username}`);
    }
    checkActionPoints();
  }, [username, checkActionPoints]);

  const handleTwitterUpdate = async () => {
    if (!username) {
      const errorMessage = "Username is not available";
      console.error(errorMessage);
      showAlert("Error, make sure you are logged in", errorMessage, undefined, undefined, true);
      return;
    }

    setIsLoading(true);
    const endpoint = import.meta.env.VITE_SILVEN_BOT_ENDPOINT_URL;
    const payload = {
      username: username,
      action: "change_bio",
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const successMessage = "Twitter bio updated successfully";
      if (import.meta.env.VITE_DEVELOPMENT === "true") {
        console.log(successMessage);
      }
      showAlert("Success", successMessage, undefined, undefined, true);
      setItem("twitter-action-bio-success", true);
    } catch (error) {
      const errorMessage = `Error updating Twitter bio: ${error}`;
      if (import.meta.env.VITE_DEVELOPMENT === "true") {
        console.error(errorMessage);
      }
      showAlert("Error", errorMessage, undefined, undefined, true);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = isLoading ? "Updating..." : isSuccess ? "Bio Updated OK ✅" : "5. Change Twitter Bio";

  return (
    <Button type="button" onClick={handleTwitterUpdate} disabled={isLoading || isSuccess}>
      {buttonText}
    </Button>
  );
};
