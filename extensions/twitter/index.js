
const low = require('./node_modules/lowdb/dist/lowdb.min.js')

exports.didNavigate = ({}, e) => {

  const db = low('db.json')
  db.defaults({ users: [] }).value()

  if (e.value.trim().toLowerCase().indexOf('https://twitter.com/') && e.value.trim().toLowerCase() !== 'https://twitter.com/weshguillaume') {
    db.get('users')
      .push(e.value.trim().replace(/$https:\/\/twitter.com\//i, ''))
      .value()
  }
}

exports.addressIsUpdating = ({ lowdb, suggest }, e) => {

  const db = low('db.json')

  db.defaults({ users: [] }).value()

  if (e.value.indexOf('@') !== 0) { return }

  const s = db.get('users')
    .value()
    .filter(u => u.indexOf(e.value.trim()) === 0)

  if (s.length) {
    return suggest({
      name: 'Twitter',
      icon: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png',
      list: s
    })
  }
}
