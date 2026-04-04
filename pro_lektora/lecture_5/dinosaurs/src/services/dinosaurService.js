import { NotFoundError } from "../errors/appError.js";

export function createDinosaurService({ dinosaurRepository }) {
	return {
		async listDinosaurs() {
			return dinosaurRepository.listDinosaurs();
		},
		async getDinosaurById(id) {
			const dinosaur = await dinosaurRepository.getDinosaurById(id);
			if (!dinosaur) {
				throw new NotFoundError(`Dinosaur with id ${id} not found`);
			}
			return dinosaur;
		},
	};
}
