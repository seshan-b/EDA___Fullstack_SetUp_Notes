exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { id: 1, name: 'name', userId: 1 },
        { id: 2, name: 'name', userId: 2 },
        { id: 3, name: 'name', userId: 2 }
      ])
    })
}
