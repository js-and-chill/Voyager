
import { updateCurrentTabUrl } from 'actions/tabs'
import { createAction } from 'redux-actions'

const addSuggestionGroup = createAction('ADD_SUGGESTION_GROUP', group => group)

const redirect = dispatch => url => dispatch(updateCurrentTabUrl({ url }))

const suggest = dispatch => group => dispatch(addSuggestionGroup(group))

export default (dispatch, getState) => {

  const { tabs } = getState()

  return {
    redirect: redirect(dispatch),
    suggest: suggest(dispatch)
  }
}
