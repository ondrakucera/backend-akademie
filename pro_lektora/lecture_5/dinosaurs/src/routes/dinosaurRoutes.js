import express from "express";

export function createDinosaurRouter({ dinosaurController }) {
	const router = express.Router();

	router.get("/dinosaurs", dinosaurController.list);
	router.get("/dinosaurs/:id", dinosaurController.getById);

	return router;
}
