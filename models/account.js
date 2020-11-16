//Requires
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    accountName: {
        type: String,
        required: true,
    },
    accountBalance: {
        type: Number,
        required: true,
    },
    accountDescription: {
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
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
