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


)

-- Create Strategies Table



-- Create Trades Table