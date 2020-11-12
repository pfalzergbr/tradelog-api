//Require modules

const express = require('express');
const mongoose = require('mongoose');

//Enviromental Variables
const dbName = process.env.DBNAME
const dbUser = process.env.DBUSER
const dbPassword = process.env.DBPASSWORD
const port = process.env.PORT || 3000

//Login URLs
const dbUrl =`mongodb+srv://${dbUser}:${dbPassword}@cluster0.paryw.mongodb.net/${dbName}?retryWrites=true&w=majority`

//Router definitions
const app = express();
const tradeRoutes = require('./routes/tradeRoutes')
const userRoutes = require('./routes/userRoutes')

//Middlewares
//Parse body
app.use(express.json())
//Routers
app.use('/api/trades', tradeRoutes)
app.use('/api/user', userRoutes)
//Error handler

// app.use((error, req, res, next) => {
//     res.status(422).send({error: error.message})
// });




//Connect Mongoose to Database

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then((result) => {
        app.listen(port, () => {
            console.log(`Waiting for trade data on ${port}`)
        });
        console.log('Database Connected! Ready, steady, trade!')
    })
    .catch(error => console.log(error))