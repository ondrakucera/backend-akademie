import { DinosaurNotFoundError } from "../errors/errors.js";
import { dinosaurRepository } from "../repositories/dinosaurRepository.js";

import {
	dinosaurBodySchema,
	dinosaurIdParamSchema,
} from "../validation/dinosaurSchemas.js";

export const dinosaurController = {
	async list(request, response, next) {
		try {
			const dinosaurs = await dinosaurRepository.listDinosaurs();
			response.json(dinosaurs);
		} catch (error) {
			next(error);
		}
	},
	async create(request, response, next) {
		try {
			const dinosaur = dinosaurBodySchema.parse(request.body);
			const id = await dinosaurRepository.createDinosaur(dinosaur);
			response.status(201).json(id);
		} catch (error) {
			next(error);
		}
	},
	async getById(request, response, next) {
		try {
			const { id } = dinosaurIdParamSchema.parse(request.params);
			const dinosaur = await dinosaurRepository.getDinosaurById(id);
			if (!dinosaur) {
				throw new DinosaurNotFoundError(id);
			}
			response.json(dinosaur);
		} catch (error) {
			next(error);
		}
	},
	async updateById(request, response, next) {
		try {
			const { id } = dinosaurIdParamSchema.parse(request.params);
			const dinosaur = dinosaurBodySchema.parse(request.body);
			const updated = await dinosaurRepository.updateDinosaurById(id, dinosaur);
			if (!updated) {
				throw new DinosaurNotFoundError(id);
			}
			response.status(204).send();
		} catch (error) {
			next(error);
		}
	},
	async deleteById(request, response, next) {
		try {
			const { id } = dinosaurIdParamSchema.parse(request.params);
			const deleted = await dinosaurRepository.deleteDinosaurById(id);
			if (!deleted) {
				throw new DinosaurNotFoundError(id);
			}
			response.status(204).send();
		} catch (error) {
			next(error);
		}
	},
};
