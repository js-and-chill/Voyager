
import voyager from 'extensions/decorator'
import fetch from 'superagent'
import jsonp from 'superagent-jsonp'

@voyager('Google', {
  suggest: true,
  redirect: true,
})
export default class Google {

  static willNavigate (url) {
    this.voyager.redirect(`https://www.google.fr/search?q=${url.replace(/\s+/g, '%20')}`)
  }

  static addressIsUpdating (value) {
  
    const formatted = value.trim()

    if (formatted.length < 3 || formatted.length > 15) { return console.log('too short or long') }

    fetch
      .get(`http://clients1.google.com/complete/search?output=toolbar&client=firefox&q=${value}`)
      .use(jsonp)
      .end((err, results) => {
        if (err) { console.log(err) }

        this.voyager.suggest({
          name: 'Google Search',
          icon: 'http://images.dailytech.com/nimage/G_is_For_Google_New_Logo_Thumb.png',
          list: results.body[1].slice(0, 5),
        })
      })
  }
}
