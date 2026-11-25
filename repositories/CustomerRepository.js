import { pool } from '../config/database.js';
import { Customer } from '../models/Customer.js';
export class CustomerRepository {
  async findAll() { const [rows] = await pool.query('SELECT * FROM customers ORDER BY customer_id DESC'); return rows.map((r) => new Customer(r)); }
  async findById(id) { const [rows] = await pool.query('SELECT * FROM customers WHERE customer_id=?', [id]); return rows[0] ? new Customer(rows[0]) : null; }
  async create(data) { const [result] = await pool.execute('INSERT INTO customers (full_name,email,phone,address) VALUES (?,?,?,?)', [data.full_name,data.email,data.phone,data.address]); return this.findById(result.insertId); }
  async update(id,data) { await pool.execute('UPDATE customers SET full_name=?,email=?,phone=?,address=? WHERE customer_id=?', [data.full_name,data.email,data.phone,data.address,id]); return this.findById(id); }
  async delete(id) { const [result] = await pool.execute('DELETE FROM customers WHERE customer_id=?', [id]); return result.affectedRows > 0; }
  async count() { const [[row]] = await pool.query('SELECT COUNT(*) AS total FROM customers'); return row.total; }
}
