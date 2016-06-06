import React from 'react'
import { Provider } from 'react-redux'
import Browser from 'components/Browser'
import store from 'store'
import Devtools from '../dev'

if (module.hot) {
  module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')))
}

export default () => (
  <Provider store={store}>
    <div>
      <Browser />
      <Devtools />
    </div>
  </Provider>
)
