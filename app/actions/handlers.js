
import { createHandler } from 'logic/createHandler'
import fetch from 'superagent'
import jsonp from 'superagent-jsonp'

export const urlHandler = createHandler({
  redirect: true,
}, {
  name: 'URL handler',
  exec (query, { redirect }) {

    const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/
    const formatted = query.trim()

    const httpFormat = `http://${formatted}`

    if (httpFormat.match(urlRegex)) {
      redirect(httpFormat)
      return true
    }

    if (!formatted.match(urlRegex)) { return false }

    redirect(formatted)
    return true
  },
})

export const googleSearch = createHandler({
  redirect: true,
  suggestGroup: true,
}, {
  name: 'Google',

  exec (query, { redirect }) {
  
    redirect(`https://www.google.fr/search?q=${query.replace(/\s+/g, '%20')}`)
    return true
  },

  suggest (query) {
    return new Promise((resolve, reject) => {
      fetch
        .get(`http://clients1.google.com/complete/search?jsonhl=en&output=toolbar&client=firefox&q=${query}`)
        .use(jsonp)
        .end((err, results) => {
          if (err) { reject(err) }

          results.body[1].length = 5

          resolve({
            name: 'Google Search',
            icon: 'http://images.dailytech.com/nimage/G_is_For_Google_New_Logo_Thumb.png',
            list: results.body[1],
          })
        })
    })
  }
})
