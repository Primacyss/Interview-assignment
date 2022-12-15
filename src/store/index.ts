import { legacy_createStore, applyMiddleware } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'

export default legacy_createStore(reducer, applyMiddleware(logger, thunk))