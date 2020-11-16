//Requires
const mongoose = require('mongoose');
const validator = require('validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Trade = require('./trade');
const Strategy = require('./strategy')
// const Account = require('./Account')
//Enviromental Variables
const jwtSecret = process.env.JWT_SECRET;

//Create a trade Schema
const Schema = mongoose.Schema;

//User Schema setup
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validator(value) {
                //Validate email format
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            },
        },
        password: {
            type: String,
            trim: true,
            required: true,
            minlength: [6, 'Password needs to be at least 6 characters'],
        },
        avatar: {
            type: String,
        },
        accounts: [{
            type: Schema.Types.ObjectId,
            ref: 'Account',
        }],

        trades: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Trade',
            },
        ],
    },
    {
        timestamps: true,
    },
);

// Virtuals to add: trades, strategies, accounts

// userSchema.virtual('trades', {
//     ref: 'Trade',
//     localField: '_id',
//     foreignField: 'trader',
// });

// userSchema.virtual('strategies', {
//     ref: 'Strategy',
//     localField: '_id',
//     foreignField: 'trader',
// });

// userSchema.virtual('accounts', {
//     ref: 'Accounts',
//     localField: '_id',
//     foreignField: 'trader',
// });

//toJSON - Hide sensitive user data from responses, no password, tokens, etc

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

//Finds the user for login, and compares the hashed passwords.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }).populate('accounts').populate('trades');
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }
    console.log(user);
    return user;
};

//Generates JWT token for authentication
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, jwtSecret);
    // user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// Hashing the password with bcrypt, saving on the user object.
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        console.log('password hashed');
    }
    next();
});

//Deletes all trades and strategies associated with the user.
userSchema.pre('remove', async function (next) {
    const user = this;
    await Trade.deleteMany({ trader: user._id });
    // await Account.deleteMany({ trader: user._id });
    await Strategy.deleteMany({ trader: user._id });
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
