import { CustomerRepository } from '../repositories/CustomerRepository.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { validateCustomer } from '../utils/validation.js';
export class CustomerService {
  constructor(repository = new CustomerRepository()) { this.repository = repository; }
  list() { return this.repository.findAll(); }
  async get(id) { const customer = await this.repository.findById(id); if (!customer) throw new NotFoundError('Customer not found.'); return customer; }
  create(input) { return this.repository.create(validateCustomer(input)); }
  async update(id,input) { await this.get(id); return this.repository.update(id,validateCustomer(input)); }
  async remove(id) { await this.get(id); const deleted = await this.repository.delete(id); if (!deleted) throw new NotFoundError('Customer not found.'); return { deleted: true }; }
}
