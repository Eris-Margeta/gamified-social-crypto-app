// logout.ts
import axios from 'axios';
import Cookies from 'js-cookie';

export const logout = async () => {
  // Clear client-side localStorage
  localStorage.clear();

  // Specifically remove the sessionID cookie
  Cookies.remove('sessionID');

  // Clear all other client-side cookies
  Object.keys(Cookies.get()).forEach(cookie => Cookies.remove(cookie));

  // Backend URL from environment variable
  const BACK_END_URL = import.meta.env.VITE_BACK_END_URL;

  // Make API call to a specific endpoint designed to clear the http-only cookie
  try {
    await axios.post(`${BACK_END_URL}/api/logout`, {}, { withCredentials: true });
    console.log('Server-side session cleared');
  } catch (error) {
    console.error('Failed to clear server-side session:', error);
  }

  // Redirect the user or refresh the page
  window.location.href = '/';
};
