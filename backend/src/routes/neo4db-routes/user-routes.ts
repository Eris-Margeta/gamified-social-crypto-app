import express from "express";
import * as userController from "../../controllers/neo4db-controllers/user-controller";

const router = express.Router();

router.post("/users", userController.addUser);

export default router;
