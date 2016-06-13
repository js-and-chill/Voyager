
import { createAction } from 'redux-actions'

import permissions from 'actions/std-functions'

export const events = [
  'didNavigate',
  'willNavigate',
  'pageDidLoad',
  'addressIsUpdating'
]

export const queryHandler = (property, dispatch, getState) => query => {

  const { extensions: { list } } = getState()

  list.filter(e => e.canHandle(property)).reduce((promise, extension) => {

    return promise.then(shouldStop => {

      if (shouldStop) { return true }
      
      console.log(extension.package.name)
      return new Promise((resolve, reject) => {
        extension.request(property, query, permissions(dispatch, getState))
          .then(resolve)
          .catch(e => console.log(e))
      })
    })
    .catch(e => console.log(e))

  }, Promise.resolve())
}

/*
 * Will trigger handlers.addressIsUpdating
 *
 * to get the suggestions while typing
 */
export const addressIsUpdating = value => (dispatch, getState) => {

  const handler = queryHandler('addressIsUpdating', dispatch, getState)
  handler(value)
}

/*
 * Will trigger handlers.pageIsLoaded
 *
 * to feed the history and handlers history
 */
export const pageDidLoad = url => (dispatch, getState) => {

  const handler = queryHandler('pageDidLoad', dispatch, getState)
  handler(url)
}

/*
 * Will trigger handlers.willNavigate
 *
 * before the page load
 */
export const willNavigate = link => (dispatch, getState) => {

  const handler = queryHandler('willNavigate', dispatch, getState)
  handler(link)
}

/*
 * Will trigger handlers.didNavigate
 *
 * after the page is loaded
 */
export const didNavigate = link => (dispatch, getState) => {

  const handler = queryHandler('didNavigate', dispatch, getState)
  handler(link)
}

