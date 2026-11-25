import { AccountRepository } from '../repositories/AccountRepository.js';
import { CustomerRepository } from '../repositories/CustomerRepository.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ValidationError } from '../errors/ValidationError.js';
import { validateAmount } from '../utils/validation.js';
import { generateAccountNumber } from '../utils/accountNumber.js';
export class AccountService {
  constructor(repository = new AccountRepository(), customers = new CustomerRepository()) { this.repository=repository; this.customers=customers; }
  list() { return this.repository.findAll(); }
  async create(input) { const customerId=Number(input.customer_id); if (!await this.customers.findById(customerId)) throw new NotFoundError('Customer does not exist.'); const type=input.account_type; if (!['Savings','Current'].includes(type)) throw new ValidationError('Account type must be Savings or Current.'); const initial= input.initial_balance === undefined || input.initial_balance === '' ? 0 : Number(input.initial_balance); if (!Number.isFinite(initial) || initial < 0 || !Number.isSafeInteger(Math.round(initial * 100))) throw new ValidationError('Initial balance must be zero or a positive valid amount.'); return this.repository.create({account_number:generateAccountNumber(),customer_id:customerId,account_type:type,initial_balance:initial}); }
}
