import crypto from "node:crypto";

import { AppError } from "../errors/appError.js";

function getCauseStackLines(error) {
	const lines = [];
	let current = error?.cause;
	while (current instanceof Error) {
		lines.push("Caused by: " + (current.stack ?? current.toString()));
		current = current.cause;
	}
	return lines;
}

function getBestMessage(error) {
	if (error instanceof AppError) {
		return error.message;
	}
	if (error?.cause instanceof Error && error.cause.message) {
		return error.cause.message;
	}
	if (error?.message) {
		return error.message;
	}
	return "Unknown error";
}

export function createErrorMiddleware() {
	// Express error middleware MUST have 4 args.
	return function errorMiddleware(error, request, response, next) {
		void next;

		const errorId = crypto.randomUUID();
		const time = new Date().toISOString();

		const statusCode = error instanceof AppError ? error.statusCode : 500;
		const message = getBestMessage(error);

		const logLines = [
			`[${time}] errorId=${errorId} status=${statusCode} ${request.method} ${request.originalUrl}`,
			`message: ${message}`,
			error?.stack ?? String(error),
			...getCauseStackLines(error),
		];
		console.error(logLines.join("\n"));

		response.status(statusCode).json({
			id: errorId,
			time,
			message,
		});
	};
}
