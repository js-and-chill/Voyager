
import { handleActions } from 'redux-actions'
import { EventEmitter } from 'events'

const { ipcRenderer } = window.require('electron')

const initial = {
  emitter: new EventEmitter(),
}

ipcRenderer.on('shortcut', (event, data) => {
  initial.emitter.emit(data)
})

export default handleActions({

}, initial)
