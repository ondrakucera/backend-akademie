import express from "express";

export function createDinosaurRouter({ dinosaurController }) {
	const router = express.Router();

	router.get("/dinosaurs", dinosaurController.list);

	return router;
}
