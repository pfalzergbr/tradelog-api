exports.up = (knex) => {
  return knex.schema.createTable('strategies', (table) => {
    table.uuid('strategy_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('strategy_name', 255).notNullable();
    table.text('description');
    table
      .uuid('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('account_id')
      .references('account_id')
      .inTable('accounts')
      .onDelete('CASCADE');
    table.timestamp('created_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('accounts');
};
