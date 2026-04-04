import { ValidationError } from "../errors/appError.js";

function parseDinosaurId(rawId) {
	const id = Number(rawId);
	const isValidId = Number.isInteger(id) && id >= 1;
	if (!isValidId) {
		throw new ValidationError(`Invalid id: ${rawId}. Expected integer >= 1.`);
	}
	return id;
}

export function createDinosaurController({ dinosaurService }) {
	return {
		async list(request, response) {
			const dinosaurs = await dinosaurService.listDinosaurs();
			response.json(dinosaurs);
		},
		async getById(request, response, next) {
			try {
				const id = parseDinosaurId(request.params.id);

				const dinosaur = await dinosaurService.getDinosaurById(id);
				response.json(dinosaur);
			} catch (error) {
				next(error);
			}
		},
		async deleteById(request, response, next) {
			try {
				const id = parseDinosaurId(request.params.id);

				await dinosaurService.deleteDinosaurById(id);
				response.status(204).send();
			} catch (error) {
				next(error);
			}
		},
	};
}
