const { app, globalShortcut } = require('electron')
const { createWindow } = require('./main')
const { ipcMain } = require('electron')

const createClientListener = (event, callback) =>
  ipcMain.on(event, callback)

createClientListener('popup', (_, url) => createWindow(url, {
  width: 600,
  height: 600,
  titleBarStyle: 'default'
}))

const shortcut = window => key => globalShortcut.register(key, () => {
  window.webContents.send(key)
})

app.on('ready', () => {
  const window = createWindow('http://localhost:3000')

  window.on('focus', () => {
    const forward = shortcut(window)

    forward('CmdOrCtrl+W')
    forward('CmdOrCtrl+T')
    forward('CmdOrCtrl+L')
    forward('CmdOrCtrl+Alt+Left')
    forward('CmdOrCtrl+Alt+Right')
  })

  window.on('blur', () => {
    globalShortcut.unregisterAll()
  })
})

app.on('blur', e => {
  globalShortcut.unregisterAll()
})
