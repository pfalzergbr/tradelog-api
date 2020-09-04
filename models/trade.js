//Requires
const mongoose = require('mongoose')

//Create a trade Schema
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
    //Symbol of the trade. Uppercase letters
    symbol: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    //Win, Loss or Breakeven
    outcome: {
        type: String,
        required: true
    },
    //Dollar amount of profit or loss, positive or negative, 2 floating points
    amount: {
        type: Number,
        required: true
    },
    //Date and time of the trade. Different from the createdAt. 
    date: {
        //Update for using moment, once the front-end is in working condition
        type: Number
    },
    //Description of the trade for later review
    description: {
        type: String
    },
    //Strategy of the trade. Should link to the particular users strategies.
    strategy: {
        type: String
    },
    //Should point at the user, who created the trade.
    userId: {
        type: Number
        //type: mongoose.Schema.Types.ObjectId
        //ref: 'User'
    },
    accountId: {
        //to expand functionality later, to manage multiple accounts per user
        type: Number
    }, 
        //Upload an optional Screenshot of the trade.
    screenshot: {
        //to expand later
        type: Buffer
    },
    trader: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
    
    
}, {
    timestamps: true
});

const Trade = mongoose.model('Trade', TradeSchema)
module.exports = Trade