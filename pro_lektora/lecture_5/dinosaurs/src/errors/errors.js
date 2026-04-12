export class DinosaurNotFoundError extends Error {
	constructor(id) {
		super(`Dinosaur with id ${id} not found.`);
	}
}
