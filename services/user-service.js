const userDb = require('../db/user-db');
const strategyDb = require('../db/strategy-db');
const accountDb = require('../db/account-db');
const tradeDb = require('../db/trade-db');
const bcrypt = require('bcrypt');

exports.checkIsEmailRegistered = async email => {
  const user = await userDb.findUserByEmail(email);
  if (user) {
    const error = new Error();
    error.message = 'E-mail already registered, please log in';
    error.code = '422';
    throw new Error(error.message);
  }
};

exports.verifyPassword = (password, verify) => {
  if (password !== verify) {
    const error = new Error();
    error.message =
      'Password and re-type password don`t match. Please Try again';
    error.code = '422';
    throw new Error(error.message);
  }
};

exports.createUser = async userData => {
  const user = await userDb.insertUser(userData);
  return user;
};

exports.checkLoginEmail = async email => {
  const user = await userDb.findUserByEmail(email);
  // console.log(user)
  if (!user) {
    const error = new Error();
    error.message = 'Unable to log in';
    error.code = '422';
    throw new Error(error.message);
  }
  return user;
};

exports.checkHashedPassword = async (password, userPassword) => {
  const isMatch = await bcrypt.compare(password, userPassword);

  if (!isMatch) {
    throw new Error('Unable to login');
  }
};

//TODO - Add error handling
exports.getUserProfile = async userId => {
  const user = await userDb.findUserById(userId);
  delete user.user_password;
  return user;
};

//Refactor for more effective SQL query
exports.getUserData = async userId => {
  const accounts = await accountDb.findAccountsByUserId(userId);
  const strategies = await strategyDb.findStrategyByUserId(userId);
  return { accounts, strategies };
};

//TODO - Add error handling
exports.updateUserProfile = async (userId, update) => {
  const user = await userDb.updateUserById(userId, update);
  return user;
};
//TODO - Add error handling
exports.deleteUser = async userId => {
  const user = await userDb.deleteUserById(userId);
  return user;
};
