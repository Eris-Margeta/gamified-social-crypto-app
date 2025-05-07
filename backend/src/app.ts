import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import the openDb function
import { openDb } from "./services/db-connection";

//import userRoutes from "./routes/neo4db-routes/user-routes";
import { verifyCode } from "./controllers/verify-code";
import { authStatus } from "./controllers/auth-status";
import { validateApiKey } from "./middleware/validate-api-key";
import { processDataHandler } from "./process-data-handler";
import { addPoints } from "./routes/add-points";
import { testUsernameGeneration } from "./routes/username-generator-tester";
import { encrypt } from "./process-data-handler-components/email-encryptor";

import { getReferrer } from "./controllers/get-referrer";
import { getUserId } from "./controllers/get-user-id";
import { authorizeSession } from "./controllers/authorize-session";
import { clearSession } from "./controllers/clear-session";

import userPointsRoutes from "./routes/user-points-routes";
import userRoutes from "./routes/user-routes";
import getUsernameRoutes from "./routes/username-by-session";
import health from "./routes/health";

dotenv.config();

const app = express();

const initializeDatabase = async () => {
  try {
    await openDb();
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize the database:", error);

    process.exit(1);
  }
};

initializeDatabase();

const corsOptions = {
  origin: [
    "http://app.localhost",
    "http://localhost:5173"
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/verify-code", validateApiKey, verifyCode);
app.post("/api/add-points", validateApiKey, addPoints);
app.use("/api", userPointsRoutes);
app.use("/api", health);
app.use("/api", userRoutes);
app.use("/api", getUsernameRoutes);
app.get("/api/test-username", testUsernameGeneration);
//app.use('/api/neo4j', userRoutes);
app.get("/api/auth/status", validateApiKey, authStatus);
app.post("/process-data", validateApiKey, processDataHandler);
app.get("/api/get-referrer", validateApiKey, getReferrer);
app.get("/api/get-user-id", validateApiKey, getUserId);
app.get("/api/get-username", validateApiKey, getUserId);
app.post("/api/authorize/", authorizeSession);
app.post("/api/clear-session", clearSession);
app.post("/encrypt", (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }
  try {
    const encryptedEmail = encrypt(email);
    res.json({ encryptedEmail });
  } catch (error) {
    console.error("Encryption error:", error);
    res.status(500).send("Error encrypting email");
  }
});

if (process.env.DEVELOPMENT === "true") {
  console.log("API_KEY:", process.env.API_KEY);
  console.log("ENCRYPTION_KEY:", process.env.ENCRYPTION_KEY);
}

export default app;
