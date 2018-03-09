
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pokemon',function(table){
    table.increments();
    table.string('name');
    table.integer('trainer_id');
    table.integer('cp');
    table.boolean('in_gym');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pokemon');
};
