import { pgClient } from "./db/client.js";
import { app } from "./app.js";

await pgClient.connect();
console.log("Connected to database");

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

process.on("SIGINT", async () => {
	console.log("Shutting down...");
	await pgClient.end();
	process.exit(0);
});
