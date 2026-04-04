import { createContainer } from "./container.js";

const { app, connect, shutdown } = createContainer();

await connect();

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

process.on("SIGINT", async () => {
	console.log("Shutting down...");
	await shutdown();
	process.exit(0);
});
