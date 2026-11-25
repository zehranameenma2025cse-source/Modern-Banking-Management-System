import { randomInt } from 'node:crypto';
/** Generates a 12-digit account identifier (not a credential). */
export function generateAccountNumber() { return `SB${Date.now().toString().slice(-6)}${randomInt(100000, 999999)}`; }
