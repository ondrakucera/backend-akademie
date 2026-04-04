import express from "express";

export function createApp({ dinosaurRouter }) {
	const app = express();

	app.use(express.json());
	app.use(dinosaurRouter);

	return app;
}
