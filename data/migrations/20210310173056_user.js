exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    
    table.uuid('user_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('user_name', 255).notNullable();
    table.string('user_email', 255).notNullable();
    table.string('user_password', 255).notNullable();
    table.timestamp('created_at');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};
