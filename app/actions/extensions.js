
import { createAction } from 'redux-actions'
import std from 'actions/std-functions'
import Extension from 'vm/sandbox'

const initialExtensions = loadJSON('/Users/guillaume/Voyager/Voyager/app/extensions.js')

const updateList = createAction('UPDATE_LIST', list => list)

export const setup = () => (dispatch, getState) => {

  const functions = std(dispatch, getState)

  initialExtensions.map(e => new ExtensionVM(e, functions).init())

  dispatch(updateList(list))
}
