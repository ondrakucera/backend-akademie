import { DinosaurNotFoundError } from "../errors/appError.js";

export function createDinosaurService({ dinosaurRepository }) {
	return {
		async listDinosaurs() {
			return dinosaurRepository.listDinosaurs();
		},
		async createDinosaur(dinosaur) {
			return dinosaurRepository.createDinosaur(dinosaur);
		},
		async getDinosaurById(id) {
			const dinosaur = await dinosaurRepository.getDinosaurById(id);
			if (!dinosaur) {
				throw new DinosaurNotFoundError(id);
			}
			return dinosaur;
		},
		async updateDinosaurById(id, dinosaur) {
			const updated = await dinosaurRepository.updateDinosaurById(id, dinosaur);
			if (!updated) {
				throw new DinosaurNotFoundError(id);
			}
		},
		async deleteDinosaurById(id) {
			const deleted = await dinosaurRepository.deleteDinosaurById(id);
			if (!deleted) {
				throw new DinosaurNotFoundError(id);
			}
		},
	};
}
