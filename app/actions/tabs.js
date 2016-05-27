
import { createAction } from 'redux-actions'
import { createExecFinder } from 'logic/exec'
import * as handlers from './handlers'
import { execFunctions } from 'actions/std-functions'

export const exec = query => dispatch => {
  const finder = createExecFinder(handlers, execFunctions(dispatch))
  finder(query)
}

export const goBack = () => dispatch => {

  const updateCurrent = createAction('UPDATE_CURRENT_TAB', updater => updater)
  dispatch(updateCurrent(tab => ({
    ...tab,
    url: tab.url + 1,
  })))
  dispatch(updateAddress())
}

export const goRight = () => (dispatch, getState) => {

  const { tabs } = getState()
  const { tabs: list, current } = tabs

  const next = current === list.length - 1 ? 0 : current + 1
  dispatch(setCurrent(next))
}

export const goLeft = () => (dispatch, getState) => {

  const { tabs } = getState()
  const { tabs: list, current } = tabs

  const next = current === 0 ? list.length - 1 : current - 1
  dispatch(setCurrent(next))
}

export const goForward = () => (dispatch, getState) => {

  const updateCurrent = createAction('UPDATE_CURRENT_TAB', updater => updater)
  dispatch(updateCurrent(tab => ({
    ...tab,
    url: tab.url ? tab.url - 1 : tab.url,
  })))
  dispatch(updateAddress())
}

export const addTab = query => (dispatch, getState) => {

  const add = createAction('ADD_TAB', tab => tab)
  const { tabs, shortcuts } = getState()


  dispatch(add({ title: query.slice(0, 9) + '...', url: 0, history: [ query ] } ))

  dispatch(setCurrent(tabs.tabs.length))
  shortcuts.emitter.emit('address:focus')
}

export const updateAddress = createAction('UPDATE_ADDRESS_BAR', url => url)

export const setCurrent = index => (dispatch, getState) => {

  const setCurrentTab = createAction('SET_CURRENT_TAB', index => index)

  dispatch(setCurrentTab(index))

  dispatch(updateAddress())
}

export const removeTab = index => (dispatch, getState) => {

  const remove = createAction('REMOVE_TAB', index => index)
  const { tabs } = getState()

  if (tabs.current === 0) { dispatch(setCurrent(0)) }
  else if (tabs.current === tabs.length - 1) { dispatch(setCurrent(tabs.length - 2)) }
  else { dispatch(setCurrent(tabs.current - 1)) }

  dispatch(remove(index))
  dispatch(updateAddress())
}

export const removeCurrent = () => (dispatch, getState) => {

  const { tabs } = getState()
  dispatch(removeTab(tabs.current))
}

export const updateLocation = url => dispatch => {

  const updateCurrent = createAction('UPDATE_CURRENT_TAB', updater => updater)

  dispatch(updateAddress(url))
  dispatch(updateCurrent(tab => ({
    ...tab,
    title: url.substr(0, 9) + '...',
    url: 0,
    history: [ url, ...tab.history ]
  })))
}

export const updateTitle = (index, title) => dispatch => {

  const updateCurrent = createAction('UPDATE_INDEX', updater => updater)

  dispatch(updateCurrent(Object.assign(
    tab => ({ ...tab, title: title.substr(0, 9) + '...' }),
    { index }
  )))
}

export const updateFavicon = (index, favicons) => dispatch => {

  const updateCurrent = createAction('UPDATE_INDEX', updater => updater)

  dispatch(updateCurrent(Object.assign(
    tab => ({ ...tab, favicon: favicons[0] || null }),
    { index }
  )))
}
