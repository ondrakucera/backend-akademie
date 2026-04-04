export class AppError extends Error {
	constructor(message, { statusCode, cause } = {}) {
		super(message, { cause });
		this.statusCode = statusCode;
	}
}

export class ValidationError extends AppError {
	constructor(message, options = {}) {
		super(message, { ...options, statusCode: 400 });
	}
}

export class DinosaurNotFoundError extends AppError {
	constructor(id) {
		super(`Dinosaur with id ${id} not found.`, { statusCode: 404 });
	}
}
