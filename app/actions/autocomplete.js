
import { createAction } from 'redux-actions'
import fetch from 'superagent'
import jsonp from 'superagent-jsonp'
import { createSuggestionsFinder } from 'logic/exec'
import * as handlers from './handlers'
import { suggestFunctions } from 'actions/std-functions'

export const suggest = query => dispatch => {

  const setSuggestions = createAction('SET_SUGGESTIONS', groups => groups)
  const finder = createSuggestionsFinder(handlers, suggestFunctions(dispatch))
  finder(query)
    .then(groups => dispatch(setSuggestions(groups)))
    .catch(e => console.log(e))
}

export const emptySuggestions = createAction('EMPTY_SUGGESTIONS')
