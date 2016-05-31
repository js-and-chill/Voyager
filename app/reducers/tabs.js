import shortid from 'shortid'
import { handleActions } from 'redux-actions'
import { findIndex, filter } from 'lodash'

const createTab = (url) => ({
  id: shortid.generate(),
  title: `${url.slice(0, 15)}...`,
  cursor: 0,
  history: [ url ],
  url
})

const first = shortid.generate()
const second = shortid.generate()

export const initialState = {

  current: 0,

  tabs: [
    { id: first, title: 'google', cursor: 0, history: [ 'https://www.google.com/' ] },
    { id: second, title: 'Youtube', cursor: 0, history: [ 'https://www.youtube.com' ] }
  ],
  history: [first, second]
}

export const reducer = {
  ADD_TAB (state, { payload: { url, append } }) {
    const { tabs } = state
    let current = state.current || 0

    if (!append) {
      return { ...state, tabs: [...tabs, createTab(url)] }
    }

    current = findIndex(tabs, { id: state.history[0] })

    const newTabs = [...tabs.slice(0, current + 1), createTab(url), ...tabs.slice(current + 1)]

    return { ...state, tabs: newTabs, current }
  },

  UPDATE_TAB_TITLE (state, { payload: { index, title } }) {
    const tabs = [...state.tabs]

    tabs[index].title = `${title.slice(0, 15)}${title.length > 15 ? '...' : ''}`

    return { ...state, tabs }
  },

  UPDATE_TAB_FAVICON (state, { payload: { index, favicon } }) {
    const tabs = [...state.tabs]

    tabs[index].favicon = favicon

    return { ...state, tabs }
  },

  UPDATE_CURRENT_TAB_URL (state, { payload: { url } }) {
    const tabs = [...state.tabs]
    const currentTab = tabs[state.current]
    const history = currentTab.history.slice(currentTab.cursor)

    currentTab.title = `${url.slice(0, 9)}...`
    currentTab.history = [url, ...history]

    return { ...state, tabs }
  },

  HISTORY_GO_BACK (state) {
    const currentTab = { ...state.tabs[state.current] }

    if (currentTab.history[currentTab.cursor + 1]) {
      currentTab.cursor++
    }

    const newTabs = [
      ...state.tabs.slice(0, state.current),
      currentTab,
      ...state.tabs.slice(state.current + 1)
    ]

    return { ...state, tabs: newTabs }
  },

  HISTORY_GO_FORWARD (state) {
    const currentTab = { ...state.tabs[state.current] }

    if (currentTab.history[currentTab.cursor - 1]) {
      currentTab.cursor--
    }

    const newTabs = [
      ...state.tabs.slice(0, state.current),
      currentTab,
      ...state.tabs.slice(state.current + 1)
    ]

    return { ...state, tabs: newTabs }
  },

  SET_CURRENT_TAB (state, { payload: { current } }) {
    const history = [state.tabs[current].id, ...state.history]
    return { ...state, current, history }
  },

  REMOVE_TAB (state, { payload: { index } }) {
    const tabId = state.tabs[index].id
    const history = filter(state.history, e => e !== tabId)
    const tabs = [...state.tabs.slice(0, index), ...state.tabs.slice(index + 1)]
    const current = findIndex(tabs, { id: history[0] })

    return { ...state, tabs, history, current }
  }

}

export default handleActions(reducer, initialState)
