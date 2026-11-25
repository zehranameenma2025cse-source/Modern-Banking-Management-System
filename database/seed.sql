USE securebank;
-- Demo-only fictional customers and opening balances. Import once into an empty database.
INSERT INTO customers (full_name,email,phone,address) VALUES
('Aarav Mehta','aarav.demo@example.test','9000000001','12 Lake View Road, Chennai'),
('Nisha Rao','nisha.demo@example.test','9000000002','24 Green Street, Chennai'),
('Kabir Shah','kabir.demo@example.test','9000000003','8 Market Lane, Chennai');
INSERT INTO accounts (account_number,customer_id,account_type,balance) VALUES
('SBDEMO000001',1,'Savings',25000.00),
('SBDEMO000002',2,'Current',85000.00),
('SBDEMO000003',3,'Savings',12750.00);
INSERT INTO transactions (account_id,transaction_type,amount,balance_after,description) VALUES
(1,'Deposit',25000.00,25000.00,'Demo opening balance'),
(2,'Deposit',85000.00,85000.00,'Demo opening balance'),
(3,'Deposit',12750.00,12750.00,'Demo opening balance');
