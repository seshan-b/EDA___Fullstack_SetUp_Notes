exports.up = function (knex) {
  return knex.schema.createTable('table_name', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.integer('userId').references('user.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('table_name')
}
