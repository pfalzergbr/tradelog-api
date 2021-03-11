
exports.up = function(knex) {
  knex.schema.table('accounts', table => {
    table.uuid('account_id').primary()
    table.string('account_name').notNullable()
    table.enu('currency', ['usd', 'eur', 'gbp', 'jpy'], { useNative: true, enumName: 'currency_type'}).notNull()
    table.text('description')
    table.decimal('balance').notNullable().defaultTo(0)
    table.decimal('opening_balance').notNullable().defaultTo(0)
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('accounts');
};
