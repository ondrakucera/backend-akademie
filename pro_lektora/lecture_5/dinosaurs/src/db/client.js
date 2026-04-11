import { Client } from "pg";

export function createPgClient() {
	return new Client({
		host: "localhost",
		port: 5432,
		database: "reactgirls_backend_akademie",
		user: "ondra",
	});
}

export const pgClient = createPgClient();
