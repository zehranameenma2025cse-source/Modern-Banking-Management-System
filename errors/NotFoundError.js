import { AppError } from './AppError.js';
export class NotFoundError extends AppError { constructor(message = 'Record not found') { super(message, 404); this.name = 'NotFoundError'; } }
