
exports.up = function(knex) {
  return knex.schema.createTable('accounts', table => {
    table.uuid('strategy_i').primary()
    table.string('strategy_name', 255).notNullable()
    table.text('description');
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE')
    table.foreign('account_id').references('account_id').inTable('accounts').onDelete('CASCADE')
    table.timestamp('created_at')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('accounts');
};
