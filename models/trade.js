//Requires
const mongoose = require('mongoose');

//Create a trade Schema
const Schema = mongoose.Schema;

const TradeSchema = new Schema(
    {
        //Symbol of the trade. Uppercase letters
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },
        //Win, Loss or Breakeven
        outcome: {
            type: String,
            required: true,
        },

        bias: {
            type: String,
        },

        //Dollar amount of profit or loss, positive or negative, 2 floating points
        amount: {
            type: Number,
            required: true,
        },
        //Date and time of the trade. Different from the createdAt.
        date: {
            //Update for using moment, once the front-end is in working condition
            type: Date,
        },
        //Description of the trade for later review
        description: {
            type: String,
        },
        //Strategy of the trade. Should link to the particular users strategies. TODO -ADD LATER
        // strategy: {
        //     type: Schema.Types.ObjectId,
        //     // required: true,
        //     ref: 'Strategy',
        // },
        
        account: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Account',
        },
        //Upload an optional Screenshot of the trade.
        screenshot: {
            //to expand later
            type: String,
        },
        //Should point at the user, who created the trade.
        trader: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

const Trade = mongoose.model('Trade', TradeSchema);
module.exports = Trade;
