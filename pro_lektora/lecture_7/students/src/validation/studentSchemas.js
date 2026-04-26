import { z } from "zod";

// Express route params are always strings.
// We validate the raw string and transform it into a Number.
export const studentIdParamSchema = z
	.object({
		id: z
			.string()
			.regex(/^\d+$/, { message: "id must be an integer >= 1" })
			.transform((value) => Number(value))
			.refine((n) => Number.isInteger(n) && n >= 1, {
				message: "id must be an integer >= 1",
			}),
	})
	.strict();

export const studentBodySchema = z
	.object({
		firstName: z.string().min(1, { message: "firstName must not be an empty string" }),
		lastName: z.string().min(1, { message: "lastName must not be an empty string" }),
		gender: z.enum(["male", "female"]),
		year: z
			.number({ invalid_type_error: "year must be a number" })
			.int({ message: "year must be an integer" })
			.min(1, { message: "year must be an integer >= 1" })
			.max(7, { message: "year must be an integer <= 7" }),
		house: z.enum(["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]),
	})
	.strict();
