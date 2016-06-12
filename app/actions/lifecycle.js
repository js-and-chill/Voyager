
import { createAction } from 'redux-actions'
import * as handlers from 'handlers'

import permissions from 'actions/std-functions'

export const events = [
  'didNavigate',
  'willNavigate',
  'pageDidLoad',
  'addressIsUpdating'
]

export const queryHandler = (property, getState) => query => {

  const { extensions: { list } } = getState()

  for (const e of list) {
    if (e.canHandle(property) && e.request(property, query)) { return }
  }
}

/*
 * Will trigger handlers.addressIsUpdating
 *
 * to get the suggestions while typing
 */
export const addressIsUpdating = value => (dispatch, getState) => {

  const handler = queryHandler('addressIsUpdating', getState)
  handler(value)
}

/*
 * Will trigger handlers.pageIsLoaded
 *
 * to feed the history and handlers history
 */
export const pageDidLoad = url => (dispatch, getState) => {

  const handler = queryHandler('pageDidLoad', getState)
  handler(url)
}

/*
 * Will trigger handlers.willNavigate
 *
 * before the page load
 */
export const willNavigate = link => (dispatch, getState) => {

  const handler = queryHandler('willNavigate', getState)
  handler(link)
}

/*
 * Will trigger handlers.didNavigate
 *
 * after the page is loaded
 */
export const didNavigate = link => (dispatch, getState) => {

  const handler = queryHandler('didNavigate', getState)
  handler(link)
}

