
import { createAction } from 'redux-actions'
import { identity } from 'lodash'

export const setShortcut = createAction('SET_SHORTCUT', identity)

export const register = (key, prop) => (dispatch, getState) => {

  const { ipcRenderer } = window.require('electron')

  ipcRenderer.on(key, () => {
    const { shortcuts } = getState()

    if (typeof shortcuts[prop] === 'function')
      shortcuts[prop]()
  })
}
