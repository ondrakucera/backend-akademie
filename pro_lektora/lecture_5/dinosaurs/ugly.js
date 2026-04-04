import express from "express";
import { Client } from "pg";

const client = new Client({
	host: "localhost",
	port: 5432,
	database: "reactgirls_backend_akademie",
	user: "ondra",
});

const app = express();

app.get("/dinosaurs", async (request, response) => {
	const result = await client.query("SELECT * FROM dinosaur");
	const dinosaurs = result.rows.map((row) => ({
		id: row.id,
		name: row.name,
		description: row.description,
		period: row.period,
		wikipediaAddress: row.wikipedia_address,
	}));
	response.json(dinosaurs);
});

await client.connect();
console.log("Connected to database");

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

process.on("SIGINT", async () => {
	console.log("Shutting down...");
	await client.end();
	process.exit(0);
});
