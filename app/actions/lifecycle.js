
import { createAction } from 'redux-actions'

import permissions from 'actions/std-functions'

export const events = [
  'didNavigate',
  'willNavigate',
  'pageDidLoad',
  'addressIsUpdating'
]

export const queryHandler = (property, getState) => query => {

  const { extensions: { list } } = getState()

  list.reduce((promise, extension) => {

    return promise.then(shouldStop => {

      if (shouldStop) { return true }
      
      return new Promise((resolve, reject) => {
        if (extension.package.name === 'url')
          console.log(`Executing extension ${extension.package.name}`)
        if (extension.canHandle(property)) {
          console.log(`Extension can handle it`)
          extension.request(property, query)
            .then(e => console.log(`Extension resolved with ${e}`) || resolve(e))
            .catch(e => console.log(e))
        }
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

  console.log(`Will Navigate: ${link}`)
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

