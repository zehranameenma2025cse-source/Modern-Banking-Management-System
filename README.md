# SecureBank – Bank Management System

A modular, object-oriented banking management project built with **Node.js, Express, JavaScript ES6, and MySQL**. This is an educational local demo, not a real banking system.


## Features
- Dashboard totals for customers, accounts, combined balances, and transaction count
- Customer create/read/update/delete (deletion is restricted when linked accounts exist)
- Savings and current account creation
- Deposits and withdrawals with positive-amount and balance checks
- Transaction ledger with resulting balances
- MySQL foreign keys, constraints, indexes, and transaction-safe balance updates
- Responsive browser dashboard


## Technology stack
Node.js 18+, Express, mysql2, MySQL 8+, HTML, CSS, browser JavaScript, ES6 classes.

## Architecture
HTTP routes → controllers → services → repositories → MySQL. Models represent data; services hold rules; repositories isolate SQL; middleware validates requests and handles errors; utilities contain reusable validation and account-number generation.

## Folder structure
```text
SecureBank/
├── config/                # Connection pool
├── controllers/            # HTTP request/response orchestration
├── database/               # Schema and sample seed data
├── errors/                  # Application error types
├── middleware/               # Async, validation, error middleware
├── models/                   # Customer, Account, Transaction classes
├── repositories/              # SQL data access
├── routes/                    # Express API routes
├── services/                   # Business rules
├── public/                     # Dashboard client
├── tests/                      # Automated tests
├── utils/                       # Validation, account-number utility
├── app.js / server.js
└── package.json
```

## Database setup (MySQL Workbench)
1. Install and start MySQL Server. Open MySQL Workbench and connect to your local instance.
2. Open `database/schema.sql`, execute the whole script (lightning icon). It creates `securebank` and its tables.
3. Optional: open `database/seed.sql` and execute it to add fictional demo customers, accounts and transactions. Run the seed only once on a fresh schema to avoid duplicate email/account values.

Tables: `customers` → one-to-many `accounts` → one-to-many `transactions`.


## Install and run in VS Code
1. Install Node.js 18+ and VS Code. Open this project folder in VS Code.
2. Copy `.env.example` to `.env`; set your local MySQL password in `.env` (never commit this file).
3. In VS Code Terminal:
```bash
npm install
npm start
```
4. Visit **http://localhost:3000**. API health endpoint: `/api/health`.

## API overview
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions/dashboard` | Dashboard totals |
| GET/POST | `/api/customers` | List/create customers |
| GET/PUT/DELETE | `/api/customers/:id` | Read/update/delete customer |
| GET/POST | `/api/accounts` | List/create accounts |
| GET/POST | `/api/transactions` | List/create deposit or withdrawal |
| GET | `/api/transactions/account/:accountId` | Account history |

Transaction body example:
```json
{"account_id":1,"type":"Deposit","amount":500,"description":"Cash deposit"}
```

## OOP concepts used
- **Classes/objects:** `Customer`, `Account`, `Transaction` model classes instantiate row objects.
- **Encapsulation:** model state is kept on instances; `Account.formattedBalance` and `Customer.initials` expose derived information through getters. Repository/service dependencies are held as instance properties.
- **Abstraction:** services expose simple operations such as `create`, `update`, and `transact`, hiding validation, SQL orchestration, and locking details from controllers.
- **Inheritance:** custom errors (`NotFoundError`, `ValidationError`) extend `AppError`; this is purposeful error-type specialization.
- **Polymorphism:** error objects share the `Error` contract while carrying specialized names/status codes; no artificial class hierarchy is added for business entities.
- **Constructors and methods:** used throughout models, repositories, services, and controllers.


## Safety and concurrency notes
Deposits/withdrawals execute in a MySQL transaction. The target account is selected using `SELECT ... FOR UPDATE` before reading/updating its balance, and the transaction record is written before commit. Errors trigger rollback. This is a demo app and has no authentication, role controls, audit-grade protections, or regulatory compliance.

## Tests
```bash
npm test
npm run check
```
Tests use Node's built-in test runner and do not require MySQL.

## Screenshots
Add screenshots from your own running application here, for example:
- `docs/dashboard.png`
- `docs/customers.png`
- `docs/transactions.png`

## Future enhancements
Authentication and authorization, CSRF protection, account transfers, exportable reports, pagination, automated integration tests with a test database, and deployment configuration.


## License
Educational project. Add a license file if you intend to publish reuse permissions.
