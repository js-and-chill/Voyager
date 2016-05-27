
import { handleActions } from 'redux-actions'

const initial = {

  current: 0,
  currentAddress: 'http://www.fapfapjs.io/',

  tabs: [
    { title: 'FapFap.js', url: 0, history: [ 'http://www.fapfapjs.io/' ] },
    { title: 'Youtube', url: 0, history: [ 'https://www.youtube.com' ] },
  ],
}

export default handleActions({

  ADD_TAB: (state, { payload: tab }) => ({
    ...state,
    tabs: [ ...state.tabs, { ...tab, key: Date.now() } ],
  }),

  REMOVE_TAB: (state, { payload: index }) => {

    const tabs = [
      ...state.tabs.slice(0, index),
      ...state.tabs.slice(index + 1),
    ]

    return ({ ...state, tabs })
  },

  UPDATE_CURRENT_TAB: (state, { payload: updater }) => ({
    ...state,
    tabs: [
      ...state.tabs.slice(0, state.current),
      updater(state.tabs[state.current]),
      ...state.tabs.slice(state.current + 1),
    ],
  }),

  UPDATE_INDEX: (state, { payload: updater }) => ({
    ...state,
    tabs: [
      ...state.tabs.slice(0, updater.index),
      updater(state.tabs[updater.index]),
      ...state.tabs.slice(updater.index + 1),
    ],
  }),

  UPDATE_ADDRESS_BAR: (state, { payload: url }) => ({
    ...state,
    currentAddress: url ,//!== undefined && url || state.tabs[state.current].history[state.tabs[state.current].url],
  }),

  SET_CURRENT_TAB: (state, { payload: current }) => ({
    ...state,
    current
  }),

}, initial)
