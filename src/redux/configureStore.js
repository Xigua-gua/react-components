/**
 redux配置
 **/

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers'

const logMiddleware = store => next => action => {
  if(typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log('dispatching:',action);
  }
  let result = next(action);
  console.log('next state:',store.getState())
  return result;
}

const reduce = combineReducers(reducers)

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  //logMiddleware,
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reduce, initialState)
}
