export class Account {
  constructor({ account_id, account_number, customer_id, account_type, balance, created_at, customer_name }) {
    this.id = account_id; this.accountNumber = account_number; this.customerId = customer_id;
    this.accountType = account_type; this.balance = Number(balance); this.createdAt = created_at; this.customerName = customer_name;
  }
  get formattedBalance() { return this.balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }); }
}
