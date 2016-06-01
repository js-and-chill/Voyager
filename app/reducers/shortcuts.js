
import { handleActions } from 'redux-actions'

const initial = {
  inputFocus: null,
  historyBack: null,
  historyForward: null,
  removeTab: null,
  newTab: null,
  tabLeft: null,
  tabRight: null
}

export default handleActions({

  SET_SHORTCUT: (state, { payload: { name, action } }) => ({
    ...state, [name]: action
  })

}, initial)
