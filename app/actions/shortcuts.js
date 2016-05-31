
import { createAction } from 'redux-actions'
import { identity } from 'lodash'

export const setShortcut = createAction('SET_SHORTCUT', identity)
