// CREATE TYPE outcome_type AS ENUM ('loss', 'breakeven', 'profit');
// CREATE TYPE bias_type AS ENUM ('bearish', 'neutral', 'bullish');

exports.up = (knex) => {
  return knex.schema.createTable('trades', (table) => {
    table.uuid('user_id').primary();
    table.string('symbol', 255).notNullable();
    table
      .enu('outcome', ['loss', 'breakeven', 'profit'], {
        useNative: true,
        enumName: 'outcome_type',
      })
      .notNullable()
      .defaultTo('breakeven');
    table.decimal('amount').notNullable().defaultTo(0);
    table.decimal('relative_gain').notNullable().defaultTo(0);
    table
      .enu('bias', ['bearish', 'bullish', 'neutral'], {
        useNative: true,
        enumName: 'bias_type',
      })
      .notNullable()
      .defaultTo('neutral');
      table.timestamp('data').notNullable()
      table.timestamp('created_at');
      table.decimal('snapshot_balance').notNullable().defaultTo(0);
      table.text('notes');
      table
      .enu('currency', ['usd', 'eur', 'gbp', 'jpy'], {
        useNative: true,
        enumName: 'currency_type',
      })
      .notNullable();
      table
      .foreign('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
      table
      .foreign('account_id')
      .references('account_id')
      .inTable('accounts')
      .onDelete('CASCADE');
      table
      .foreign('strategy_id')
      .references('strategy_id')
      .inTable('strategies')
      .onDelete('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('trades');
};
