
import { handleActions } from 'redux-actions'

const initial = {
  groups: [],
}

export default handleActions({

  SET_SUGGESTIONS: (state, { payload: groups }) => ({ ...state, groups }),

  ADD_SUGGESTION_GROUP: (state, { payload: group }) => ({
    ...state,
    groups: [ ...state.groups, group ]
  })

}, initial)
