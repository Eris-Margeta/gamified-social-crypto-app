// Provides functionalities to interact with session storage for error message handling.

// setErrorsInSessionStorage(errors: ErrorMessages): void - Saves an array of error messages to session storage under the key 'errors'.

// getErrorsFromSessionStorage(): ErrorMessages - Retrieves error messages stored in session storage. Returns an empty array if no errors are found.


// Define the type for errors as an array of strings
type ErrorMessages = string[];

export const setErrorsInSessionStorage = (errors: ErrorMessages): void => {
  sessionStorage.setItem('errors', JSON.stringify(errors));
};

export const getErrorsFromSessionStorage = (): ErrorMessages => {
  const errors = sessionStorage.getItem('errors');
  return errors ? JSON.parse(errors) : [];
};
