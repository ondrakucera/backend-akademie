import express from "express";

export function createDinosaurRouter({ dinosaurController }) {
	const router = express.Router();

	router.get("/dinosaurs", dinosaurController.list);
	router.get("/dinosaurs/:id", dinosaurController.getById);
	router.delete("/dinosaurs/:id", dinosaurController.deleteById);

	return router;
}
