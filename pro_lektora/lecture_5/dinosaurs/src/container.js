import { createPgClient } from "./db/client.js";
import { createDinosaurRepository } from "./repositories/dinosaurRepository.js";
import { createDinosaurService } from "./services/dinosaurService.js";
import { createDinosaurController } from "./controllers/dinosaurController.js";
import { createDinosaurRouter } from "./routes/dinosaurRoutes.js";
import { createApp } from "./app.js";

export function createContainer() {
	const client = createPgClient();
	const dinosaurRepository = createDinosaurRepository({ client });
	const dinosaurService = createDinosaurService({ dinosaurRepository });
	const dinosaurController = createDinosaurController({ dinosaurService });
	const dinosaurRouter = createDinosaurRouter({ dinosaurController });
	const app = createApp({ dinosaurRouter });

	async function connect() {
		await client.connect();
		console.log("Connected to database");
	}

	async function shutdown() {
		await client.end();
	}

	return {
		app,
		connect,
		shutdown,
	};
}
