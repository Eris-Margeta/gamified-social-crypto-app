// A utility function to check for specific keys in local storage and perform actions based on their existence.

// Used in App.tsx to conditionally render components based on local storage data.



const checkLocalStorage = (setShowAction: (show: boolean) => void) => {
  const encryptedEmail = localStorage.getItem('encryptedEmail');
  const referrer = localStorage.getItem('referrer');

  // Assuming the presence of both 'encryptedEmail' and 'referrer' indicates a logged-in state.
  const isLoggedIn = encryptedEmail !== null && referrer !== null;
  setShowAction(isLoggedIn);

  // Optionally, log the state for debugging purposes
  if (isLoggedIn) {
    console.log('Encrypted Email:', encryptedEmail);
    console.log('Referrer:', referrer);
  } else {
    console.log('User is not logged in or session data is missing.');
  }
};

export default checkLocalStorage;
