//Requires
const mongoose = require('mongoose');

const Trade = require('./trade');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountName: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },

    stats: {
        wins: {
            type: Number
        },
        losses: {
            type: Number
        },
        breakevens: {
            type: Number
        },
        totalTrades: {
            type: Number
        }
    },

    pnl: {
        totalProfit: {
            type: Number
        },
        totalLoss: {
            type: Number
        }
    },

    trader: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // strategies: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Strategy',
    //     },
    // ],
    trades: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Trade',
        },
    ],
});

//Deleting all trades belonging to this account in trades collection.
accountSchema.pre('remove', async function (next) {
    const account = this;
    await Trade.deleteMany({trader: account._id})
    next();
})

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
