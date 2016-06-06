
import { createAction } from 'redux-actions'
import * as handlers from 'handlers'

import permissions from 'actions/std-functions'

export const queryHandler = (property, ...state) => query => {

  const keys = Object.keys(handlers)

  for (const key of keys) {
    const handler = handlers[key](permissions(...state))

    if (handler[property](query)) { return }
  }
}

/*
 * Will trigger handlers.addressIsUpdating
 *
 * to get the suggestions while typing
 */
export const addressIsUpdating = value => (...state) => {

  const handler = queryHandler('addressIsUpdating', ...state)
  handler(value)
}

/*
 * Will trigger handlers.pageIsLoaded
 *
 * to feed the history and handlers history
 */
export const pageDidLoad = url => (...state) => {

  const handler = queryHandler('pageDidLoad', ...state)
  handler(url)
}

/*
 * Will trigger handlers.willNavigate
 *
 * before the page load
 */
export const willNavigate = link => (...state) => {

  const handler = queryHandler('willNavigate', ...state)
  handler(link)
}

/*
 * Will trigger handlers.didNavigate
 *
 * after the page is loaded
 */
export const didNavigate = link => (...state) => {

  const handler = queryHandler('didNavigate', ...state)
  handler(link)
}

