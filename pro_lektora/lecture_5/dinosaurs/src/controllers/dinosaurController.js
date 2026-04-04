import { ValidationError } from "../errors/appError.js";

export function createDinosaurController({ dinosaurService }) {
	return {
		async list(request, response) {
			const dinosaurs = await dinosaurService.listDinosaurs();
			response.json(dinosaurs);
		},
		async getById(request, response, next) {
			try {
				const rawId = request.params.id;
				const id = Number(rawId);
				const isValidId = Number.isInteger(id) && id >= 1;
				if (!isValidId) {
					throw new ValidationError(`Invalid id: ${rawId}. Expected integer >= 1.`);
				}

				const dinosaur = await dinosaurService.getDinosaurById(id);
				response.json(dinosaur);
			} catch (error) {
				next(error);
			}
		},
	};
}
