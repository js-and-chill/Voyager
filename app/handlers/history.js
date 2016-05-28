
import { createHandler } from 'logic/createHandler'

export const history = createHandler({
  
}, {

  name: 'History',

  exec (query) {
  
    const history = JSON.parse(localStorage.getItem('history'))

    if (!history.includes(query)) {
      localStorage.setItem('history', JSON.stringify([ ...history, query ]))
    }
  },

  suggest (query) {
  
    return new Promise((resolve, reject) => {
    
      setTimeout(() => {
        const history = JSON.parse(localStorage.getItem('history') || '[]')

        const results = history.filter(url => url.indexOf(query.match(/\S+/g).join(' ')) > -1)

        resolve({
          name: 'History',
          icon: 'https://cdn0.iconfinder.com/data/icons/very-basic-android-l-lollipop-icon-pack/24/clock-128.png',
          list: results.slice(0, 5),
        })
      }, 0)
    })
  }
})
