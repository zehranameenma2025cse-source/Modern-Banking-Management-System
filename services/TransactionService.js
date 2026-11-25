import { pool } from '../config/database.js';
import { AccountRepository } from '../repositories/AccountRepository.js';
import { TransactionRepository } from '../repositories/TransactionRepository.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ValidationError } from '../errors/ValidationError.js';
import { validateAmount } from '../utils/validation.js';
export class TransactionService {
  constructor(accounts = new AccountRepository(), transactions = new TransactionRepository()) { this.accounts=accounts; this.transactions=transactions; }
  list() { return this.transactions.findAll(); }
  byAccount(id) { return this.transactions.findByAccount(id); }
  async transact({account_id,type,amount,description}) {
    const accountId=Number(account_id); const money=validateAmount(amount);
    if (!['Deposit','Withdrawal'].includes(type)) throw new ValidationError('Transaction must be Deposit or Withdrawal.');
    const connection=await pool.getConnection();
    try {
      await connection.beginTransaction();
      const account=await this.accounts.withLockedAccount(connection,accountId);
      if (!account) throw new NotFoundError('Account not found.');
      const current=Number(account.balance);
      const next= type==='Deposit' ? Number((current+money).toFixed(2)) : Number((current-money).toFixed(2));
      if (type==='Withdrawal' && next < 0) throw new ValidationError('Insufficient balance for this withdrawal.');
      await this.accounts.updateBalance(connection,accountId,next);
      await this.transactions.record(connection,{account_id:accountId,transaction_type:type,amount:money,balance_after:next,description:String(description||'').slice(0,255)});
      await connection.commit();
      return { account_id:accountId, transaction_type:type, amount:money, balance_after:next };
    } catch(error) { await connection.rollback(); throw error; }
    finally { connection.release(); }
  }
}
