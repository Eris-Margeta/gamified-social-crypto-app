import { Request, Response, NextFunction } from "express";

export const validateApiKey = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const apiKey = req.headers["api-key"];
	const expectedApiKey = process.env.API_KEY;

	if (!apiKey || apiKey !== expectedApiKey) {
		res.status(401).send("Incorrect request ApiKey");
	} else {
		next();
	}
};
