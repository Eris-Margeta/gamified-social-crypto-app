import express from "express";
import { getUserPointsHandler } from "../controllers/user-all-points-controller";
import { getActionPointsHandler } from "../controllers/get-action-points-handler";
import { validateApiKey } from "../middleware/validate-api-key";

const router = express.Router();

router.get("/user-points/:username", validateApiKey, getUserPointsHandler);
router.get("/user-action-points/:username", validateApiKey, getActionPointsHandler);


export default router;
