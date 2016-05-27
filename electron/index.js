const { app, globalShortcut } = require('electron')
const { createWindow } = require('./main')
const { ipcMain } = require('electron')

const createClientListener = (event, callback) =>
  ipcMain.on(event, callback)

createClientListener('popup', (_, url) => createWindow(url, {
  width: 600,
  height: 600,
  titleBarStyle: 'default',
}))

const shortcut = window => (key, event) => globalShortcut.register(key, () => {
  window.webContents.send('shortcut', event)
})

app.on('ready', () => {
  const window = createWindow('http://localhost:3000')
  
  window.on('focus', () => {

    const register = shortcut(window)

    register('CommandOrControl+L', 'address:focus')
    register('CommandOrControl+T', 'new:tab')
    register('CommandOrControl+W', 'remove:tab')
    register('CommandOrControl+Alt+Left', 'tab:left')
    register('CommandOrControl+Alt+Right', 'tab:right')
  
  })

  window.on('blur', () => {
    globalShortcut.unregisterAll()
  })
})

app.on('blur', e => {
  globalShortcut.unregisterAll()
})
