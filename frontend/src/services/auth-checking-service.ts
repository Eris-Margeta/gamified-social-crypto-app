import Cookies from 'js-cookie';

export const checkAuthStatus = async (): Promise<boolean> => {
  const BACK_END_URL: string = import.meta.env.VITE_BACK_END_URL;
  const API_KEY: string = import.meta.env.VITE_API_KEY;
  const sessionID = Cookies.get('sessionID');


  if (!sessionID) {
    console.log('No local sessionID cookie found.');
    return false; 
  }

  try {

    const response = await fetch(`${BACK_END_URL}/api/auth/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Session-ID': sessionID, 
        'Authorization': `Bearer ${API_KEY}`, 
      },
      credentials: 'include',
    });

    const data = await response.json();
    console.log('Server response:', data); 

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return false;
    }


    return data.authenticated as boolean;
  } catch (error) {
    console.error('Failed to check authentication status:', error);
    return false;
  }
};
