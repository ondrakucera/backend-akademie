import crypto from "node:crypto";

import { ZodError } from "zod";

import { DinosaurNotFoundError } from "../errors/errors.js";

export function createErrorMiddleware() {
	// Express error middleware MUST have 4 args.
	// eslint-disable-next-line no-unused-vars
	return function errorMiddleware(error, request, response, next) {
		console.error(error);

		const errorId = crypto.randomUUID();
		const time = new Date().toISOString();

		if (error instanceof ZodError) {
			const issues = error.issues.map((issue) => ({ path: issue.path, message: issue.message, code: issue.code }));
			response.status(400).json({ id: errorId, time, message: "Validation error.", issues });
			return;
		}

		if (error instanceof DinosaurNotFoundError) {
			response.status(404).json({ id: errorId, time, message: error.message });
			return;
		}

		response.status(500).json({ id: errorId, time, message: error.message });
	};
}
