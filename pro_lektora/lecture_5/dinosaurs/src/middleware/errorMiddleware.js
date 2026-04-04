import crypto from "node:crypto";

import { AppError } from "../errors/appError.js";

export function createErrorMiddleware() {
	// Express error middleware MUST have 4 args.
	// eslint-disable-next-line no-unused-vars
	return function errorMiddleware(error, request, response, next) {
		console.error(error);

		const statusCode = error instanceof AppError ? error.statusCode : 500;
		const errorId = crypto.randomUUID();
		const time = new Date().toISOString();
		const message = error.message ?? "Unknown error.";

		response.status(statusCode).json({ id: errorId, time, message });
	};
}
