
import { updateLocation } from 'actions/tabs'
import { createAction } from 'redux-actions'

export const execFunctions = dispatch => ({

  redirect: url => dispatch(updateLocation(url)),
})

const addSuggestionGroup = createAction('ADD_SUGGESTION_GROUP', group => group)

export const suggestFunctions = dispatch => ({

  suggestGroup: group => dispatch(addSuggestionGroup(group)),
})
