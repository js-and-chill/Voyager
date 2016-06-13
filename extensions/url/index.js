
exports.willNavigate = ({ redirect }, e) => {

  const formatted = e.value.trim().toLowerCase()
  const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/
  const localhostRegex = /^(https?:\/\/)?localhost:[0-9]+$/

  if (
    formatted.match(localhostRegex) ||
    formatted.match(urlRegex) ||
    `http://${formatted}`.match(localhostRegex) ||
    `http://${formatted}`.match(urlRegex)
  ) {
    redirect(formatted.indexOf('h') === 0 && formatted || `http://${formatted}`)
    return e.stopPropagation()
  }

  return e.next()
}
