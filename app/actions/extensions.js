
import { createAction } from 'redux-actions'
import std from 'actions/std-functions'
import ExtensionVM from 'vm/sandbox'
import fs from 'fs'

const loadJSON = file => JSON.parse(fs.readFileSync(file, 'utf-8'))

const initialExtensions = loadJSON('/Users/guillaume/Voyager/Voyager/app/extensions.json')

const updateList = createAction('UPDATE_LIST', list => list)

export const setup = () => (dispatch, getState) => {

  const functions = std(dispatch, getState)

  const list = initialExtensions.map(e => new ExtensionVM(e, functions).init())

  dispatch(updateList(list))
}
