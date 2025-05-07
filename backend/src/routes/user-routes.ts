import express from "express";
import { updateUserController } from "../controllers/update-user-controller";
import { readUserDataController } from "../controllers/read-user-data";
import { validateApiKey } from "../middleware/validate-api-key";

const router = express.Router();

router.patch("/user-data/:username", validateApiKey, updateUserController);
router.get("/user-data/:username", validateApiKey, readUserDataController);

export default router;
