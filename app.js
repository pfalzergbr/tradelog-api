//Require modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet')
//Enviromental Variables
const port = process.env.PORT || 5000;

//Login URLs

//Router definitions
const app = express();
const errorHandler = require('./middleware/errorHandler');
const tradeRoutes = require('./routes/tradeRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const strategyRoutes = require('./routes/strategyRoutes');

//Middlewares


//Parse body
app.use(helmet())
app.use(express.json());
//Setting CORS headers
app.use(cors());

if (process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))

}
//Routers
app.use('/api/trades', tradeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/strategy', strategyRoutes);
//Error handling middleware, responding to frontend.
app.use(errorHandler);


//Set up port to listen to

app.listen(port, () => {
    console.log(`Listening for trading data on port ${port}`);
});
