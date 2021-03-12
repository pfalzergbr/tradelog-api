
exports.up = (knex) => {
  return knex.schema.createTable('users', table => {
      table.uuid('user_id').primary();
      table.string('user_name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('password', 255).notNullable();
      table.timestamp('created_at')
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};
