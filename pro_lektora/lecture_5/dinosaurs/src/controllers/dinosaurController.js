import { DinosaurNotFoundError, ValidationError } from "../errors/appError.js";
import { dinosaurRepository } from "../repositories/dinosaurRepository.js";

function parseDinosaurId(rawId) {
	const id = Number(rawId);
	const isValidId = Number.isInteger(id) && id >= 1;
	if (!isValidId) {
		throw new ValidationError(`Invalid id: ${rawId}. Expected integer >= 1.`);
	}
	return id;
}

function parseRequiredStringBodyAttribute(body, fieldName) {
	if (typeof body[fieldName] !== "string") {
		throw new ValidationError(`${fieldName} must be a string`);
	}
	if (body[fieldName].length === 0) {
		throw new ValidationError(`${fieldName} must not be an empty string`);
	}
	return body[fieldName];
}

function parseDinosaurBody(body) {
	if (!body || typeof body !== "object") {
		throw new ValidationError("Request body must be a JSON object");
	}

	// Ignore extra keys; ignore any `id` in the body.
	return {
		name: parseRequiredStringBodyAttribute(body, "name"),
		description: parseRequiredStringBodyAttribute(body, "description"),
		period: parseRequiredStringBodyAttribute(body, "period"),
		wikipediaAddress: parseRequiredStringBodyAttribute(body, "wikipediaAddress"),
	};
}

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
			const dinosaur = parseDinosaurBody(request.body);
			const id = await dinosaurRepository.createDinosaur(dinosaur);
			response.status(201).json(id);
		} catch (error) {
			next(error);
		}
	},
	async getById(request, response, next) {
		try {
			const id = parseDinosaurId(request.params.id);
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
			const id = parseDinosaurId(request.params.id);
			const dinosaur = parseDinosaurBody(request.body);
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
			const id = parseDinosaurId(request.params.id);
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
