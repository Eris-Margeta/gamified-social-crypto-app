import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { SessionContext } from '@/contexts/session-context'; 

interface UserData {
  username: string;
  referrer: string;
  discordUsername: string | null;
  instagramUsername: string | null;
  twitterUsername: string | null;
  phoneNumber: string | null;
  country: string | null;
  age: number | null;
  profilePicture: string | null;
  isWhitelisted: boolean;
  web3address: string;
  ownsnft: boolean;
  magicLink: string;
}

export const useFetchUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { username: sessionUsername } = useContext(SessionContext);

  useEffect(() => {
    const username = sessionUsername || Cookies.get('username');
    if (!username) {
      setError('Username is not available');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/api/user-data/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sessionUsername]); 

  return { userData, isLoading, error };
};
