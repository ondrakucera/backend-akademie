import { DinosaurNotFoundError } from "../errors/errors.js";
import { dinosaurRepository } from "../repositories/dinosaurRepository.js";

import {
	dinosaurBodySchema,
	dinosaurIdParamSchema,
} from "../validation/dinosaurSchemas.js";

export const dinosaurController = {
	async list(request, response) {
		const dinosaurs = await dinosaurRepository.listDinosaurs();
		response.json(dinosaurs);
	},
	async create(request, response) {
		const dinosaur = dinosaurBodySchema.parse(request.body);
		const id = await dinosaurRepository.createDinosaur(dinosaur);
		response.status(201).json(id);
	},
	async getById(request, response) {
		const { id } = dinosaurIdParamSchema.parse(request.params);
		const dinosaur = await dinosaurRepository.getDinosaurById(id);
		if (!dinosaur) {
			throw new DinosaurNotFoundError(id);
		}
		response.json(dinosaur);
	},
	async updateById(request, response) {
		const { id } = dinosaurIdParamSchema.parse(request.params);
		const dinosaur = dinosaurBodySchema.parse(request.body);
		const updated = await dinosaurRepository.updateDinosaurById(id, dinosaur);
		if (!updated) {
			throw new DinosaurNotFoundError(id);
		}
		response.status(204).send();
	},
	async deleteById(request, response) {
		const { id } = dinosaurIdParamSchema.parse(request.params);
		const deleted = await dinosaurRepository.deleteDinosaurById(id);
		if (!deleted) {
			throw new DinosaurNotFoundError(id);
		}
		response.status(204).send();
	},
};
