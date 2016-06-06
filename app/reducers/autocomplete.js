
import { handleActions } from 'redux-actions'

const initial = {
  groups: []
}

export default handleActions({

  SET_SUGGESTIONS: (state, { payload: groups }) => ({ ...state, groups }),

  ADD_SUGGESTION_GROUP: (state, { payload: group }) => {

    const { groups } = state
    
    for (let i = 0; i < groups.length; i++) {
      if (group.name === groups[i].name) {
        groups[i] = group
        return { ...state, groups }
      }
    }

    return { ...state, groups: [ ...groups, group ] }
  }

}, initial)
