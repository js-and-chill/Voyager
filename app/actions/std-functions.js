
import { updateCurrentTabUrl } from 'actions/tabs'
import { createAction } from 'redux-actions'
import { remote } from 'electron'

import fetch from 'superagent'

const addSuggestionGroup = createAction('ADD_SUGGESTION_GROUP', group => group)

const emptySuggestions_ = createAction('EMPTY_SUGGESTIONS', name => name)

const redirect = dispatch => url => {
  dispatch(updateCurrentTabUrl({ url }))
}

const suggest = dispatch => group => {
  dispatch(addSuggestionGroup(group))
}

const emptySuggestions = dispatch => name => dispatch(emptySuggestions_(name))

export default (dispatch, getState) => {

  return {
    redirect: redirect(dispatch),
    suggest: suggest(dispatch),
    alert: window.alert.bind(window),
    emptySuggestions: emptySuggestions(dispatch),

    fetch (url, callback) {
    
      fetch
        .get(url)
        .end((e, result) => e ?
             callback.call(null, e) :
             callback.call(null, null, JSON.parse(result.text)))
    }
  }
}
