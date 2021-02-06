## [Tradelog](https://tradelog-app.herokuapp.com/) - Back-End
### Porftolio-project by Gabor Pfalzer

Back-end code for the Tradelog project. My first full stack web application for the portfolio site, built mainly for my own practice. Connects to a React frond-end, [Tradelog Front](https://github.com/pfalzergbr/tradelog-front).

### Backend Stack
- Javascript
- Express
- PostgresSQL 
- Node Postgres

The application is help retail traders on financial markets keep track of their trading activities, may there be Stocks, Forex, Options or Cryptocurrencies.
Traders can create separate accounts for different kind of trading, and add strategies to differentiate between different trading activities. The application summarises profits, losses, win percentages, average profits and losses by accounts, strategies. 

Since most trading platforms and brokers provide robust analytical tools and expensive real-time data, this is more a practice project than a viable product, although it could be very useful for self assessing strategies and building discipline for individual retail traders. Most major brokers provide APIs to connect applications like this to fetch data and make it way more useful, but since it is not meant to be a full fledged product, did not go down that avenue. 

Also explored using other financial API-s to fetch stock market data, was very keen on build in a Symbol search and populating company data. Unfortunately, restrictions on the free APIs don't actually make this possible, even on this scale. 


### Structure

The project is broken up into routes, controllers, services and database layer, as my first attempt to structure a slightly larger Node-Express application. I decided not to use an ORM for handling the database, mainly to give me an opportunity to practice with raw SQL queries. Great learning experience, although the messy database code would really benefit from a major refactor, most likely with Knex in the first round. 

The router handles accounts, strategies, trades and users separately, the routes are validated by express-validate. 

### Authentication

Authentication flow is handled with JSON Web Token, passwords are stored encrypted in the database with bcyrpt. Routes are protected with authentication middleware. 

### Database

Data is stored in a PostgresSQL database, using [node-postgres]('https://github.com/brianc/node-postgres-docs/blob/master/content/welcome.mdx'), without an ORM or query builder, mainly to practice writing SQL queries. Planning to refactor the database handling with Knex query builder. 

### Todos

- Refactor the database connection with a query builder, DRY the code. 
- Add test coverage with Jest