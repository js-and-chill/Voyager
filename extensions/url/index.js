
exports.willNavigate = ({ redirect }, e) => {

  console.log(`Extension got: ${e.value}`)

  const formatted = e.value.trim().toLowerCase()
  const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/
  const localhostRegex = /^(https?:\/\/)?localhost:[0-9]+$/

  if (
    formatted.match(localhostRegex) ||
    formatted.match(urlRegex) ||
    `http://${formatted}`.match(localhostRegex) ||
    `http://${formatted}`.match(urlRegex)
  ) {
    console.log(`Trigger redirection to ${formatted.indexOf('h') === 0 && formatted || 'http://' + formatted}`)
    console.log(redirect.toString())
    redirect(formatted.indexOf('h') === 0 && formatted || `http://${formatted}`)
    console.log('redirection done')
    return e.stopPropagation()
  }

  console.log(`Calling next`)
  return e.next()
}
