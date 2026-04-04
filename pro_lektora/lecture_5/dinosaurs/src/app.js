import express from "express";

import { createErrorMiddleware } from "./middleware/errorMiddleware.js";

export function createApp({ dinosaurRouter }) {
	const app = express();

	app.use(express.json());
	app.use(dinosaurRouter);
	app.use(createErrorMiddleware());

	return app;
}
