SELECT account_name, strategy_name FROM users 
JOIN accounts ON users.user_id = accounts.user_id 
JOIN strategies ON users.user_id = strategies.user_id WHERE users.user_id = '6221a50c-da34-4966-bac9-32460c9ab814' GROUP BY accounts.account_id; 