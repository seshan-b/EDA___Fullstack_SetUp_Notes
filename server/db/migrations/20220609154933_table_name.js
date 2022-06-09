exports.up = function (knex) {
  return knex.schema.createTable('films', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.integer('userId').references('user.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('films')
}
