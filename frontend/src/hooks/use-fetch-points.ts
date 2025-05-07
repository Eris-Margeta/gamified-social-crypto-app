import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { SessionContext } from '../contexts/session-context'; 

interface FetchPointsResponse {
  username: string;
  totalPoints: number;
}

export const useFetchPoints = () => {
  const [points, setPoints] = useState<number | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { username: sessionUsername } = useContext(SessionContext);

  useEffect(() => {
    const fetchPoints = async () => {
      const username = sessionUsername || Cookies.get('username'); 
      if (!username) {
        setIsLoading(true); 
        return;
      }

      const API_URL = import.meta.env.VITE_BACK_END_URL;
      const API_KEY = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${API_URL}/api/user-points/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: FetchPointsResponse = await response.json();
        setPoints(data.totalPoints);
        setIsLoading(false); 
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching points');
        setIsLoading(false); 
      }
    };

    fetchPoints();
    const intervalId = setInterval(fetchPoints, 7000); 

    return () => clearInterval(intervalId); 
  }, [sessionUsername]); 

  return { points, isLoading, error };
};
