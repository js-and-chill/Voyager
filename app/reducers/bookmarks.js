
import { handleActions } from 'redux-actions'

const initial = {

  list: [],
}

export default handleActions({

  ADD_BOOKMARK: (state, { payload: bookmark }) => ({ ...state, list: [ ...state.list, bookmark ] }),

  REMOVE_BOOKMARK: (state, { payload: index }) => ({
    ...state,
    list: [
      ...state.list.slice(0, index),
      ...state.list.slice(index),
    ]
  }),

}, initial)
