
import voyager from 'extensions/decorator'

@voyager('Url', {
  redirect: true
})
class Url {

  static willNavigate (query) {
  
    const formatted = query.trim().toLowerCase()
    const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/
    const localhostRegex = /^(https?:\/\/)?localhost:[0-9]+$/

    if (
      formatted.match(localhostRegex) ||
      formatted.match(urlRegex) ||
      `http://${formatted}`.match(localhostRegex) ||
      `http://${formatted}`.match(urlRegex)
    ) {
      this.voyager.redirect(formatted.indexOf('h') === 0 && formatted || `http://${formatted}`)
      return true
    }
  }
}

export default Url
