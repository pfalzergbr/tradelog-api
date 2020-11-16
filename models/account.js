//Requires
const mongoose = require('mongoose');

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
    trader: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    strategies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Strategy',
        },
    ],
    trades: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Trade',
        },
    ],
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
