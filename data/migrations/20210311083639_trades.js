exports.up = (knex) => {
  return knex.schema.createTable('trades', (table) => {
    table.uuid('trade_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('symbol', 255).notNullable();
    table
      .enu('outcome', null, {
        useNative: true,
        existingType: true,
        enumName: 'outcome_type',
      })
      .notNullable()
      .defaultTo('breakeven');
    table.decimal('amount').notNullable().defaultTo(0);
    table.decimal('relative_gain').notNullable().defaultTo(0);
    table
      .enu('bias', null, {
        useNative: true,
        existingType: true,
        enumName: 'bias_type',
      })
      .notNullable()
      .defaultTo('neutral');
      table.timestamp('data').notNullable()
      table.timestamp('created_at');
      table.decimal('snapshot_balance').notNullable().defaultTo(0);
      table.text('notes');
      table
      .enu('currency', null, {
        useNative: true,
        existingType: true,
        enumName: 'currency_type'
      })
      .notNullable();
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
      table
      .uuid('strategy_id')
      .references('strategy_id')
      .inTable('strategies')
      .onDelete('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('trades');
};
