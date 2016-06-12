
import { handleActions } from 'redux-actions'

const initial = {
  list: []
}

export default handleActions({

  UPDATE_LIST (state, { payload: list }) {
    return { ...state, list }
  }
}, initial)
