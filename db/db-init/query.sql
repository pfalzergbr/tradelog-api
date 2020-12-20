SELECT account_name, strategy_name FROM users 
JOIN accounts ON users.user_id = accounts.user_id 
JOIN strategies ON users.user_id = strategies.user_id WHERE users.user_id = '6221a50c-da34-4966-bac9-32460c9ab814' GROUP BY accounts.account_id; 



-- Select trades with strategy and account names
SELECT symbol, outcome, bias, amount, account_name, strategy_name FROM trades
JOIN accounts ON trades.account_id = accounts.account_id
JOIN strategies ON trades.strategy_id = strategies.strategy_id;

-- Select p&l, number of trades by account, 
SELECT account_name, sum(amount) AS "PnL", avg(amount)::numeric(10,2) AS "average amount",  count(*) AS "num_of_trades" from trades
JOIN accounts ON trades.account_id = accounts.account_id
GROUP BY accounts.account_id;


-- Return account statistics
SELECT 
    account_name, 
    sum(amount) AS "total_pnl", 
    avg(amount)::numeric(10,2) AS "average amount", 
    avg(case WHEN amount > 0 THEN amount END)::numeric(10,2) AS "average profit", 
    avg(case WHEN amount < 0 THEN amount END)::numeric(10,2) AS "average loss", 
    count(case WHEN amount < 0 THEN amount END) AS "num_of_loss", 
    count(case WHEN amount > 0 THEN amount END) AS "num_of_profit", 
    count(case WHEN amount = 0 THEN amount END) AS "num_of_be", 
    count(*) AS "num_of_trades" 
FROM trades
--WHERE user_id = $1
JOIN accounts ON trades.account_id = accounts.account_id
GROUP BY accounts.account_id;


-- Return strategy statistics
SELECT 
    strategy_name, 
    sum(amount) AS "total_pnl", 
    avg(amount)::numeric(10,2) AS "average amount", 
    avg(case WHEN amount > 0 THEN amount END)::numeric(10,2) AS "average profit", 
    avg(case WHEN amount < 0 THEN amount END)::numeric(10,2) AS "average loss", 
    count(case WHEN amount < 0 THEN amount END) AS "num_of_loss", 
    count(case WHEN amount > 0 THEN amount END) AS "num_of_profit", 
    count(case WHEN amount = 0 THEN amount END) AS "num_of_be", 
    count(*) AS "num_of_trades" 
FROM trades
--WHERE user_id = $1 AND account_id = $2 AND 
JOIN strategies ON trades.strategy_id = strategies.strategy_id
GROUP BY strategies.strategy_id;