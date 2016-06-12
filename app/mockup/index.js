
exports.willNavigate = ({ redirect }, value) => {
  
  redirect(`https://www.google.fr/search?q=${value.replace(/\s+/g, '%20')}`)
  return true
}

exports.addressIsUpdating = ({ suggest, jsonp, fetch, alert, emptySuggestions }, value) => {

  const formatted = value.trim().toLowerCase()

  if (formatted.length < 3 || formatted.length > 15) { return emptySuggestions('Google Search') }

  fetch(`http://clients1.google.com/complete/search?output=toolbar&client=firefox&q=${value}`, (err, results) => {
    if (err) { return emptySuggestions('Google Search') }

    suggest({
      name: 'Google Search',
      icon: 'http://images.dailytech.com/nimage/G_is_For_Google_New_Logo_Thumb.png',
      list: results[1].slice(0, 5)
    })
  })
}
