
import { handleActions } from 'redux-actions'

const initial = {
  shouldSelectAddress: false,
}

export default handleActions({
  
  SELECT_ADDRESS: state => ({ ...state, shouldSelectAddress: true }),
  DESELECT_ADDRESS: state => ({ ...state, shouldSelectAddress: false }),

})
