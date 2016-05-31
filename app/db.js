import knex from 'knex/build/knex'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './voyage.sqlite'
  }
})

export default db
