import dotenv from 'dotenv'; dotenv.config();
import app from './app.js'; import { testConnection, pool } from './config/database.js';
const port=Number(process.env.PORT||3000);
try { await testConnection(); app.listen(port,()=>console.log(`SecureBank is running at http://localhost:${port}`)); }
catch(error) { console.error('Database connection failed. Check .env and MySQL service.',error.message); process.exit(1); }
process.on('SIGINT',async()=>{await pool.end();process.exit(0);});
