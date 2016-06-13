
import { createAction } from 'redux-actions'
import { createExecFinder } from 'logic/exec'
import * as handlers from 'handlers'
import { execFunctions } from 'actions/std-functions'
import { identity } from 'lodash'

import { didNavigate } from './lifecycle'

export const exec = query => dispatch => {
  const finder = createExecFinder(handlers, execFunctions(dispatch))
  finder(query)
}

export const updateDisplayUrl = createAction('UPDATE_DISPLAY_URL', identity)

export const setCurrentTab = createAction('SET_CURRENT_TAB', identity)

export const historyGoBack = createAction('HISTORY_GO_BACK')

export const historyGoForward = createAction('HISTORY_GO_FORWARD')

export const addTab = createAction('ADD_TAB', identity)

export const updateCurrentTabUrl = createAction('UPDATE_CURRENT_TAB_URL', identity)

export const removeTab = createAction('REMOVE_TAB', identity)

export const updateTabTitle = createAction('UPDATE_TAB_TITLE', identity)

export const updateTabFavicon = createAction('UPDATE_TAB_FAVICON', identity)
