import shortid from 'shortid'
import { handleActions } from 'redux-actions'

const createTab = (url) => ({
  id: shortid.generate(),
  title: `${url.slice(0, 9)}...`,
  cursor: 0,
  history: [ url ],
  url
})

const initial = {

  current: 0,

  tabs: [
    { id: shortid.generate(), title: 'FapFap.js', cursor: 0, history: [ 'http://www.fapfapjs.io/' ] },
    { id: shortid.generate(), title: 'Youtube', cursor: 0, history: [ 'https://www.youtube.com' ] }
  ],
  history: []
}

export default handleActions({
  ADD_TAB (state, { payload: { url, append } }) {
    const { tabs, current } = state

    if (!append) {
      return { ...state, tabs: [...tabs, createTab(url)] }
    }

    const newTabs = [...tabs.slice(0, current), createTab(url), ...tabs.slice(current + 1)]
    const history = state.history.slice(1)

    return { ...state, tabs: newTabs, history }
  },

  UPDATE_TAB_TITLE (state, { payload: { index, title } }) {
    const tabs = [...state.tabs]

    tabs[index].title = title

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
    console.log(current)
    const history = [state.tabs[current].id, ...state.history]

    return { ...state, current, history }
  },

  REMOVE_TAB (state, { payload: { index } }) {
    const tabs = [...state.tabs.slice(0, index), ...state.tabs.slice(index + 1)]
    return { ...state, tabs, current: 0 }
  }

}, initial)
