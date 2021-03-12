exports.up = (knex) => {
  return knex.schema.createTable('accounts', (table) => {
    table.uuid('account_id').primary();
    table.string('account_name', 255).notNullable();
    table
      .enu('currency', ['usd', 'eur', 'gbp', 'jpy'], {
        useNative: true,
        enumName: 'currency_type',
      })
      .notNullable();
    table.text('description');
    table.decimal('balance').notNullable().defaultTo(0);
    table.decimal('opening_balance').notNullable().defaultTo(0);
    table
      .uuid('user_id')
      // .foreign('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamp('created_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('accounts');
};
