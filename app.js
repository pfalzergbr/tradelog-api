//Require modules
const express = require('express');
const cors = require('cors');

//Enviromental Variables
const port = process.env.PORT || 3000;

//Login URLs

//Router definitions
const app = express();
const errorHandler = require('./middleware/errorHandler');
const tradeRoutes = require('./routes/tradeRoutes');
const userRoutes = require('./routes/userRoutes');

//Middlewares

//Parse body
app.use(express.json());
//Setting CORS headers
app.use(cors());
//Routers
app.use('/api/trades', tradeRoutes);
app.use('/api/user', userRoutes);

//Error handling middleware, responding to frontend.
app.use(errorHandler);

//Set up port to listen to

app.listen(port, () => {
    console.log(`Listening for trading data on port ${port}`);
});
