import { ValidationError } from '../errors/ValidationError.js';
export function requireFields(fields) {
  return (req, res, next) => {
    const missing = fields.filter((field) => req.body?.[field] === undefined || String(req.body[field]).trim() === '');
    if (missing.length) return next(new ValidationError(`Required fields: ${missing.join(', ')}`));
    next();
  };
}
