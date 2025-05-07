# Backend Documentation
Express.js framework app, written in typescript, using jest for tests (coming soong), and babel, and sqlite db

# ENTRY POINT index.ts -> app.ts

# app.ts

- Initializes an Express application with CORS and JSON body parsing middleware.
- Defines routes for database reading, data processing, and email encryption.
- Utilizes environment variables for API and encryption keys, demonstrating the use of dotenv for configuration.
- The /encrypt endpoint directly uses the encrypt function to return encrypted email data (used only for testing)

## app.ts endpoints

- /process-data (main endpoint) -> calls /process-data-handler functions, main endpoint for frontend-backend communication
- /encrypt (testing)-> used only for encrypting an email via a CURL request, for testing, in order to submit a correctly encrypted email to put in the url to test for the response and decryption, simulates the user who came on our index page from a referral link
- /database-reader (unfinished)(testing)-> used only for reading the database for generating the json tree and populating the ORACLE page

# process-data-handler

- Endpoint handler for processing and saving data received in POST requests.
- Validates API key before proceeding with data handling, ensuring secure access.
- Utilizes encrypt for email encryption and parseReferrer to interpret the referrer URL.
- Saves processed data to a database using writeToDb, structured with user information and timestamps.
- Responds with success or error messages based on the operation outcome.

## process-data-handler-components

# api-key-validation

- Validates the API key provided in the request headers against an expected API key stored in environment variables.
- If the API key is missing or incorrect, it sends a 401 response indicating unauthorized access.
- Calls next() to proceed to the next middleware function upon successful validation.


# db-writer

- Manages database interactions, specifically writing records to an SQLite database.
- Database Connection: Utilizes sqlite and sqlite3 to open a connection to a database file located in the data-received directory.
- Database Initialization: Automatically creates a userData table if it does not exist, ensuring the application can start with an empty or new database.
- Writing to Database: Provides a writeToDb function that inserts a new record into the userData table. The record includes fields for referrer, newUser, newUserID, userIP, and timestamp.
- Initialization: Executes the database initialization function upon module load, preparing the database for incoming data without requiring manual setup.


# process-data-handler-components/email-encryptor

- Implements encryption and decryption functionalities using AES-256-CBC algorithm.
- Encryption Key: Uses an environment variable for the encryption key, with a fallback to a hardcoded value if the environment variable is not set.
- Initialization Vector (IV): Generates a random IV for each encryption operation, ensuring each encrypted message is unique.
- Encryption Process: Encrypts a given text, concatenates the IV and the encrypted data, and returns the result as a URI-encoded string.
- Decryption Process: Decodes and splits the encrypted string to extract the IV and encrypted data, then decrypts and returns the original text. Handles errors and invalid formats gracefully, returning error messages for decryption failures.


# process-data-handler-components/parse-referrer

- A utility function to decrypt and parse the referrer URL from request data.
- Decryption: Attempts to decrypt the query part of the URL using the decrypt function from email-encryptor.
- Error Handling: If decryption fails due to invalid format, IV length, or other decryption errors, it returns the original query string to avoid data loss.
- URL Parsing: Uses the URL global object to parse the provided URL and extract the query string for decryption. Handles exceptions by logging errors and returning a default "Invalid URL format" message.


--------------------
--------------------

# FOR THE ORACLE PAGE
# database-reader
-used for oracle page on the front end - not connected to the basic functionality 

- Asynchronously reads data from a database and transforms it into a specific structure.
- Uses queryDatabase to fetch user data and transformData to organize it into a tree-like structure.
- Saves the transformed data to a JSON file, 
- Handles errors gracefully, providing feedback through HTTP response codes and messages.