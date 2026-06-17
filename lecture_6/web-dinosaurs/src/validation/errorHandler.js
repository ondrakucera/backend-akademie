import { z, ZodError } from "zod";

export const errorHandler = () => {
	return (error, request, response, next) => {
		if (error && error instanceof ZodError) {
			const prettyError = {
				message: "Validation error",
				detail: z.prettifyError(error),
			};
			response.status(400).json(prettyError);
			return;
		}
		next(error);
	};
};
