# ENTRY POINT 
index.html -> main.tsx -> App.tsx 


# App.tsx

- Root component integrating React Router for navigation within a simple dashboard.
- Utilizes useState and useEffect for managing component state and side effects, respectively.
- Implements a layout structure using MainLayout, with routes to different pages/components like EmailSubmitForm and OraclePage.
- Manages application-wide errors through a custom hook useErrorHandling and displays them using NegativeAlert.
- Conditionally renders components based on application state, such as displaying an action or email submission form.

--------------
--------------

# LAYOUTS
# @/layouts/main-layout

- Provides a consistent layout structure for pages, including a header, main content area, and footer.
- Displays a dropdown menu with user-related options and information, leveraging local storage for displaying encrypted email.
--------------
--------------
# COMPONENTS
# @/components/email-submit

- Renders a form for email submission, capturing user input and IP address.
- Utilizes useEmailSubmission hook for form submission logic, including error handling and submission callback.

# @/components/email-submit-components/form-submission-logic

- Introduces a custom hook useEmailSubmission designed to manage the email submission process, including input state, submission, and error handling.
- State Management: Manages the email input state with useState.
- API Interaction: Handles sending the email data to a specified API endpoint, leveraging environment variables for the API endpoint and key.
- Error Handling: Provides mechanisms to report errors back to the parent component through a callback function onSetErrors.
- Submission Callback: Invokes a callback function onSubmitted upon successful submission of the email data.

# @/components/alerts/negative-alert

- Displays an alert message for errors, supporting multiple error messages.
- Uses Heroicons for visual representation of the alert state.

# @/components/actions

- A component showcasing actionable buttons with conditional rendering of a PositiveAlert based on state.
- Manages visibility of alerts and actions through local state.
--------------
--------------
# HOOKS
# @/hooks/error-handling

- A custom hook for managing error states and visibility within components.
- Provides functionality to set errors, automatically hide them after a timeout, and clear them.
---------------
--------------

# UTILITIES
# @/utilities/check-local-storage

- A utility function to check for specific keys in local storage and perform actions based on their existence.
- Used in App.tsx to conditionally render components based on local storage data.

# @/utilities/error-msgs-in-session-storage

- Provides functionalities to interact with session storage for error message handling.
- setErrorsInSessionStorage(errors: ErrorMessages): void - Saves an array of error messages to session storage under the key 'errors'.
- getErrorsFromSessionStorage(): ErrorMessages - Retrieves error messages stored in session storage. Returns an empty array if no errors are found.


# @/utilities/referrer-parser

- Contains a function to parse and interpret the referrer information.
- parseReferrer(referrer: string): string - Analyzes the referrer string and returns a formatted message. It distinguishes between no referrer, an email referrer, and unknown referrers, providing a human-readable interpretation.

--------------
--------------

# @/lib 
- Folder made by ShadCN npx for reusable react components follow-up data 
# @/components/catalyst 
- Folder for tailwind catalyst reusable UI components


