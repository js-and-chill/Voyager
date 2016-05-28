import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import Devtools from 'dev'
import * as reducers from 'reducers'

const createStoreWithMiddlewares = compose(applyMiddleware(thunk), Devtools.instrument())(createStore)
const reducer = combineReducers(reducers)

export default createStoreWithMiddlewares(reducer)
