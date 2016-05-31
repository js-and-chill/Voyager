module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './voyage.sqlite3'
    }
  },
  staging: {
    client: 'sqlite3',
    connection: {
      filename: './voyage.sqlite3'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './voyage.sqlite3'
    }
  }
}
