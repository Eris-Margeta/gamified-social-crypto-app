import { Request, Response, NextFunction } from "express";

export const validateApiKey = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const apiKey = req.headers["authorization"]?.split(" ")[1];
	if (apiKey === process.env.API_KEY) {
		next();
	} else {
		res.status(401).json({ error: "Unauthorized: Invalid API key" });
	}
};
