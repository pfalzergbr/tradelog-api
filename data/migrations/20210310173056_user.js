
exports.up = function(knex) {
  knex.schema.createTable('users', tbl => {
      tbl.increments('user_id');
      table.string('user_name')
  })
};

exports.down = function(knex) {
  
};
