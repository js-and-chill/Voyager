import React, { Component } from 'react'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Devtools from '../dev'

import * as reducers from '../reducers'
import Browser from 'components/Browser'
import Address from './Address'

const createStoreWithMiddlewares = compose(applyMiddleware(thunk), Devtools.instrument())(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddlewares(reducer)

if (module.hot) {
    module.hot.accept('../reducers', () =>
    store.replaceReducer(require('../reducers')))
}

class Main extends Component {

  render () {
  
    return (
      <Provider store={store}>
        <Browser />
      </Provider>
    )
  }
}

export default Main
