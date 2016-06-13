
exports.willNavigate = ({ redirect }, e) => {

  redirect(`https://www.google.fr/search?q=${e.value.replace(/\s+/g, '%20')}`)
  return e.stopPropagation()
}

exports.addressIsUpdating = ({ suggest, fetch, emptySuggestions }, e) => {

  const formatted = e.value.trim().toLowerCase()

  if (formatted.length < 3 || formatted.length > 15) {
    emptySuggestions('Google Search')
    return e.next()
  }

  fetch(`http://clients1.google.com/complete/search?output=toolbar&client=firefox&q=${e.value}`, (err, results) => {
    if (err) {
      console.log(`Err:`, err)
      emptySuggestions('Google Search')
      return e.next()
    }

    suggest({
      name: 'Google Search',
      icon: 'http://images.dailytech.com/nimage/G_is_For_Google_New_Logo_Thumb.png',
      list: results[1].slice(0, 5)
    })
  })
}
