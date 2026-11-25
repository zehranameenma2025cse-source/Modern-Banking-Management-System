import { pool } from '../config/database.js';
import { Transaction } from '../models/Transaction.js';
export class TransactionRepository {
  async findAll(limit = 100) { const [rows] = await pool.query('SELECT t.*, a.account_number FROM transactions t JOIN accounts a ON a.account_id=t.account_id ORDER BY t.transaction_id DESC LIMIT ?', [Number(limit)]); return rows.map((r) => new Transaction(r)); }
  async findByAccount(accountId, limit = 100) { const [rows] = await pool.query('SELECT t.*, a.account_number FROM transactions t JOIN accounts a ON a.account_id=t.account_id WHERE t.account_id=? ORDER BY t.transaction_id DESC LIMIT ?', [accountId,Number(limit)]); return rows.map((r) => new Transaction(r)); }
  async count() { const [[row]] = await pool.query('SELECT COUNT(*) AS total FROM transactions'); return row.total; }
  async record(connection, {account_id,transaction_type,amount,balance_after,description}) { return connection.execute('INSERT INTO transactions (account_id,transaction_type,amount,balance_after,description) VALUES (?,?,?,?,?)', [account_id,transaction_type,amount,balance_after,description || null]); }
}
