#first-data-backend

-> Index.ts runs on port 5001
-> Email and hash are recieved on the /submit-first route
-> It loads api key from the .env file and compares it to the api key from the react component's header
-> If the api key matches, it stores the data in the csv file in the project root's folder "data-received" under filename "email-and-hash-first-payload.csv"

#TESTING
-start up the server "pnpm dev"

-curl test-encrypt-endpoint with curl
-curl test-process-data-endpoint by curl, attaching encrypted email in the request
