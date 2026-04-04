import { z } from "zod";

// Express route params are always strings.
// We validate the raw string and transform it into a Number.
export const dinosaurIdParamSchema = z
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

export const dinosaurBodySchema = z
	.object({
		name: z.string().min(1, { message: "name must not be an empty string" }),
		description: z.string().min(1, { message: "description must not be an empty string" }),
		period: z.string().min(1, { message: "period must not be an empty string" }),
		wikipediaAddress: z.string().min(1, { message: "wikipediaAddress must not be an empty string" }),
	})
	.strict();
