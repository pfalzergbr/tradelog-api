CREATE DATABASE tradelog;

-- Create Users table
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


-- Create Accounts Table
CREATE TABLE accounts (
    account_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_name VARCHAR(255) NOT NULL,
    description TEXT,
    balance DECIMAL(12,2) NOT NULL DEFAULT 0,
    user_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(), 
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);


-- Create Strategies Table

CREATE TABLE strategies (
    strategy_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    strategy_name VARCHAR(255) NOT NULL,
    description TEXT,
    --pnl?
    user_id uuid NOT NULL,
    account_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(), 
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (account_id) REFERENCES accounts (account_id)
);

-- Create Enums for trades

CREATE TYPE outcome_type AS ENUM ('loss', 'breakeven', 'profit', );
CREATE TYPE bias_type AS ENUM ('bearish', 'neutral', 'bullish');

-- Create Trades Table


CREATE TABLE trades (
    trade_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(16) NOT NULL,
    outcome outcome_type NOT NULL DEFAULT 'breakeven',
    amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    bias bias_type NOT NULL DEFAULT 'neutral',
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    notes TEXT,
    user_id uuid NOT NULL,
    account_id uuid NOT NULL,,
    strategy_id uuid NOT NULL,,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (account_id) REFERENCES accounts (account_id)
    FOREIGN KEY (strategy_id) REFERENCES strategies (strategy_id)
)