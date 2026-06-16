import express from "express";
import { dinosaurRepository } from "../repositories/dinosaurRepository.js";

export const dinosaurRouter = express.Router();

// Obtains all dinosaurs.
dinosaurRouter.get("/dinosaurs", async (request, response) => {
	const dinosaurs = await dinosaurRepository.listDinosaurs();
	response.json(dinosaurs);
});

// Get one dinosaur by ID.
dinosaurRouter.get("/dinosaurs/:id", async (request, response) => {
	const id = Number(request.params.id);
	const dinosaur = await dinosaurRepository.getDinosaurById(id);
	if (dinosaur === null) {
		response.sendStatus(404);
		return;
	}
	response.json(dinosaur);
});

// Insert dinosaur into DB.
dinosaurRouter.post("/dinosaurs", async (request, response) => {
	const dinosaur = request.body;
	const id = await dinosaurRepository.createDinosaur(dinosaur);
	response.json(id);
});

// Update dinosaur by id in DB.
dinosaurRouter.put("/dinosaurs/:id", async (request, response) => {
	const id = Number(request.params.id);
	const dinosaur = request.body;
	const result = await dinosaurRepository.updateDinosaurById(id, dinosaur);
	if (!result) {
		response.sendStatus(404);
		return;
	}
	response.sendStatus(204);
});

// Delet dinosaur by id.
dinosaurRouter.delete("/dinosaurs/:id", async (request, response) => {
	const id = Number(request.params.id);
	const result = await dinosaurRepository.deleteDinosaurById(id);
	if (!result) {
		response.sendStatus(404);
		return;
	}
	response.sendStatus(204);
});
