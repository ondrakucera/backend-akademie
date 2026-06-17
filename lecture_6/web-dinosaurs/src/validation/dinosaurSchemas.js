import { z } from "zod";

export const dinosaurIdParamSchema = z
	.object({
		id: z.coerce.number().int("id must be an integer").min(1, { message: "id must be an integer >= 1" }),
	})
	.strict();

export const dinosaurBodySchema = z
	.object({
		name: z.string().min(1, { message: "name must not be an empty string" }).max(256),
		description: z.string().min(1, { message: "description must not be an empty string" }).max(4096),
		period: z.string().min(1, { message: "period must not be an empty string" }).max(32),
		wikipediaAddress: z.string().min(1, { message: "wikipediaAddress must not be an empty string" }).max(4096),
	})
	.strict();
