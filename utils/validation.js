import { ValidationError } from '../errors/ValidationError.js';
export function validateCustomer(input) {
  const fullName = String(input.full_name ?? '').trim();
  const email = String(input.email ?? '').trim().toLowerCase();
  const phone = String(input.phone ?? '').trim();
  const address = String(input.address ?? '').trim();
  if (fullName.length < 2 || fullName.length > 100) throw new ValidationError('Name must be between 2 and 100 characters.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) throw new ValidationError('Enter a valid email address.');
  if (!/^[0-9+()\-\s]{7,20}$/.test(phone)) throw new ValidationError('Enter a valid phone number.');
  if (address.length < 3 || address.length > 255) throw new ValidationError('Address must be between 3 and 255 characters.');
  return { full_name: fullName, email, phone, address };
}
export function validateAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(Math.round(amount * 100))) throw new ValidationError('Amount must be a positive valid number.');
  return Number(amount.toFixed(2));
}
