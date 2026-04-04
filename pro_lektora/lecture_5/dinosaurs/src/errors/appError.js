export class AppError extends Error {
	constructor(message, { statusCode, cause } = {}) {
		super(message, { cause });
		this.name = this.constructor.name;
		this.statusCode = statusCode;
	}
}

export class ValidationError extends AppError {
	constructor(message, options = {}) {
		super(message, { ...options, statusCode: 400 });
	}
}

export class NotFoundError extends AppError {
	constructor(message, options = {}) {
		super(message, { ...options, statusCode: 404 });
	}
}
