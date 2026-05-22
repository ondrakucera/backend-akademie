import express from "express";
import { dinosaurRepository } from "../repositories/dinosaurRepository.js";
import { dinosaurBodySchema, dinosaurIdParamSchema } from "../validation/dinosaurSchemas.js";

export const dinosaurRouter = express.Router();

// Obtains all dinosaurs.
dinosaurRouter.get("/dinosaurs", async (request, response) => {
	const dinosaurs = await dinosaurRepository.listDinosaurs();
	response.json(dinosaurs);
});

// Obtains a dinosaur by its ID.
dinosaurRouter.get("/dinosaurs/:id", async (request, response) => {
	const { id } = dinosaurIdParamSchema.parse(request.params);
	const dinosaur = await dinosaurRepository.getDinosaurById(id);
	if (!dinosaur) {
		// If the dinosaur wasn't found, we set the HTTP response's status to 404.
		response.status(404).send();
		return;
	}
	response.json(dinosaur);
});

// Creates a new dinosaur.
dinosaurRouter.post("/dinosaurs", async (request, response) => {
	const dinosaur = dinosaurBodySchema.parse(request.body);
	const id = await dinosaurRepository.createDinosaur(dinosaur);
	response.status(201).json(id);
});

// Updates a dinosaur.
dinosaurRouter.put("/dinosaurs/:id", async (request, response) => {
	const { id } = dinosaurIdParamSchema.parse(request.params);
	const dinosaur = dinosaurBodySchema.parse(request.body);
	const updated = await dinosaurRepository.updateDinosaurById(id, dinosaur);
	if (!updated) {
		// If the dinosaur to be updated wasn't found, we set the HTTP response's status to 404.
		response.status(404).send();
		return;
	}
	response.status(204).send();
});

// Deletes a dinosaur.
dinosaurRouter.delete("/dinosaurs/:id", async (request, response) => {
	const { id } = dinosaurIdParamSchema.parse(request.params);
	const deleted = await dinosaurRepository.deleteDinosaurById(id);
	if (!deleted) {
		// If the dinosaur to be deleted wasn't found, we set the HTTP response's status to 404.
		response.status(404).send();
		return;
	}
	response.status(204).send();
});
