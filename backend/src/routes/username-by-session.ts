import express from "express";
import { getUsernameBySessionIdController } from "../controllers/get-username";
import { validateApiKey } from "../middleware/validate-api-key";

const router = express.Router();

router.get(
	"/username-by-session/:sessionID",
	validateApiKey,
	getUsernameBySessionIdController
);

export default router;
