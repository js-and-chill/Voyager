
const fetch = require('superagent')

const jsonp = require('superagent-jsonp')

exports.fetch = (url, callback) => {

  const promise = fetch
    .get(url)
    .use(jsonp)
    .end((err, response) => {
      if (err) { return callback.call(null, err) }
      callback.call(null, null, JSON.parse(response.text))
    })
}
