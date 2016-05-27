
const { app, BrowserWindow } = require('electron')

const createWindow = exports.createWindow = (src, options = {}) => {
  const win = new BrowserWindow(Object.assign({
    width: 1200,
    heihgt: 900,
    titleBarStyle: 'hidden-inset',
  }, options))

  win.loadURL(src)
  return win
}
