
import { createAction } from 'redux-actions'
import { createSuggestionsFinder } from 'logic/exec'
import * as handlers from 'handlers'
import { suggestFunctions } from 'actions/std-functions'

export const suggest = query => dispatch => {
  console.log('Suggestions')
  const setSuggestions = createAction('SET_SUGGESTIONS', groups => groups)
  const finder = createSuggestionsFinder(handlers, suggestFunctions(dispatch))
  finder(query)
    .then(groups => dispatch(setSuggestions(groups)))
    .catch(e => console.log(e))
}

export const emptySuggestions = createAction('EMPTY_SUGGESTIONS')
