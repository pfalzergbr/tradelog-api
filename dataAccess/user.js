const knex = require('../data/db');

exports.insertUser = async ({email, name, hashedPassword}) => {
  const user = await knex('users')
    .insert({
      user_email: email,
      user_name: name, 
      user_password: hashedPassword
    })
    .returning(['user_email', 'user_name', 'user_password']);
    console.log(user)
    return user[0];
    
};

exports.findUserById = async (userId) => {
  const user = await knex('users')
    .where({user_id : userId})
  return user[0];
};


exports.findUserByEmail = async (email) => {
  const user = await knex('users')
    .where({user_email: email});
  return user[0];
}

exports.updateUserById = async (id, update) => {
  const user = await knex('users')
    .where({
      user_id: id
    })
    .update({
      user_name: update.name
    })
    .returning(['user_id', 'user_name'])
  return user[0];
}

exports.deleteUserById = async id => {
  const user = await knex('users')
    .where({user_id: id})
    .returnig('user_id')
  return user;
}