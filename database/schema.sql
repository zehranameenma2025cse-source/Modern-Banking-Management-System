CREATE DATABASE IF NOT EXISTS securebank CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE securebank;
CREATE TABLE IF NOT EXISTS customers (
  customer_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_customers_name(full_name)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS accounts (
  account_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  account_number VARCHAR(20) NOT NULL UNIQUE,
  customer_id INT UNSIGNED NOT NULL,
  account_type ENUM('Savings','Current') NOT NULL,
  balance DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_account_balance CHECK (balance >= 0),
  CONSTRAINT fk_accounts_customer FOREIGN KEY(customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX idx_accounts_customer(customer_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS transactions (
  transaction_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  account_id INT UNSIGNED NOT NULL,
  transaction_type ENUM('Deposit','Withdrawal') NOT NULL,
  amount DECIMAL(14,2) NOT NULL,
  balance_after DECIMAL(14,2) NOT NULL,
  description VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_transaction_amount CHECK(amount > 0),
  CONSTRAINT fk_transactions_account FOREIGN KEY(account_id) REFERENCES accounts(account_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX idx_transactions_account_date(account_id,created_at),
  INDEX idx_transactions_created(created_at)
) ENGINE=InnoDB;
