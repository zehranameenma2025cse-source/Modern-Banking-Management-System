export class Transaction {
  constructor({ transaction_id, account_id, transaction_type, amount, balance_after, description, created_at, account_number }) {
    this.id = transaction_id; this.accountId = account_id; this.type = transaction_type; this.amount = Number(amount);
    this.balanceAfter = Number(balance_after); this.description = description; this.createdAt = created_at; this.accountNumber = account_number;
  }
}
