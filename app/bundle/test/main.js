
voyager.on('ready', () => {

  const { redirect } = voyager.browser

  redirect('https://www.google.com')
})
