import { pool } from '../config/database.js';
import { Account } from '../models/Account.js';
export class AccountRepository {
  async findAll() { const [rows] = await pool.query('SELECT a.*, c.full_name AS customer_name FROM accounts a JOIN customers c ON c.customer_id=a.customer_id ORDER BY a.account_id DESC'); return rows.map((r) => new Account(r)); }
  async findById(id) { const [rows] = await pool.query('SELECT a.*,c.full_name AS customer_name FROM accounts a JOIN customers c ON c.customer_id=a.customer_id WHERE a.account_id=?', [id]); return rows[0] ? new Account(rows[0]) : null; }
  async findByNumber(number) { const [rows] = await pool.query('SELECT * FROM accounts WHERE account_number=?', [number]); return rows[0] ? new Account(rows[0]) : null; }
  async create({ account_number, customer_id, account_type, initial_balance = 0 }) { const [result] = await pool.execute('INSERT INTO accounts (account_number,customer_id,account_type,balance) VALUES (?,?,?,?)', [account_number,customer_id,account_type,initial_balance]); return this.findById(result.insertId); }
  async count() { const [[row]] = await pool.query('SELECT COUNT(*) AS total FROM accounts'); return row.total; }
  async totalBalance() { const [[row]] = await pool.query('SELECT COALESCE(SUM(balance),0) AS total FROM accounts'); return Number(row.total); }
  async withLockedAccount(connection,id) { const [rows] = await connection.query('SELECT * FROM accounts WHERE account_id=? FOR UPDATE', [id]); return rows[0] || null; }
  async updateBalance(connection,id,balance) { await connection.execute('UPDATE accounts SET balance=? WHERE account_id=?', [balance,id]); }
}
