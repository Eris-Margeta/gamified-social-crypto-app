import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/health", async (req: Request, res: Response) => {
	res.sendStatus(200);
}
);

export default router;
