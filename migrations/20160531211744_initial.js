
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('history', function (t) {
    t.increments('id').primary()
    t.string('title')
    t.string('url')
    t.string('favicon')
    t.timestamp('createdAt').notNullable()
    t.timestamp('updatedAt').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('history')
}
