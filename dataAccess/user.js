const db = require('../data/db');

exports.insertUser = async (email, name, hashedPassword) => {
  const [user_email, user_name, user_password] = await db('person')
    .insert({
      user_email: email,
      user_name: name, 
      user_password: hashedPassword
    })
    .returning([user_email, user_name, user_password]);
};
