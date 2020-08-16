//Requires
const mongoose = require('mongoose')
    // Further packages to look for later: jsonwebtoken, bcrypt, validator



//Create a trade Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        //Need to add Validator. Look for 'validator package
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [6, 'Password needs to be at least 6 characters']
    },
    avatar: {
        type: Buffer
    },
    tokens: [
        {
        token: {
            type: String, 
            required: true
        }
    }]
},
{
    timestamps: true
});
 
//Virtuals to add: trades, strategies

// userSchema.virtual('trades', {
//     ref: 'Trade',
//     localField: '_id',
//     foreignField: 'owner'
// })

// userSchema.virtual('strategies', {
//     ref: 'Strategy',
//     localField: '_id',
//     foreignField: 'owner'
// })

const User = mongoose.model('User', userSchema);
module.exports = User