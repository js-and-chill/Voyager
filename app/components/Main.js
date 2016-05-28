import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Browser from 'components/Browser'
import store from 'store'
// import Devtools from '../dev'

if (module.hot) {
  module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')))
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
