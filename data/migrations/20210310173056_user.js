
exports.up = (knex) => {
  return knex.schema.createTable('users', tbl => {
      tbl.uuid('user_id').primary();
      tbl.string('user_name').notNullable();
      tbl.string('email').notNullable();
      tbl.string('password').notNullable();
      tbl.timestamp('created_at', [defaultNow])
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};
