
import { handleActions } from 'redux-actions'

const initial = {
  
  startup: {
    tabs: [ 'https://www.google.com' ],
  },

  appearence: {
    theme: 'default',
    showNavBar: false,
  },
}

export default handleActions({
  
  UPDATE_APPEARENCE: (state, { payload: appearence }) => ({ ...state, appearence }),
  UPDATE_STARTUP: (state, { payload: startup }) => ({ ...state, startup }),
  
}, initial)
