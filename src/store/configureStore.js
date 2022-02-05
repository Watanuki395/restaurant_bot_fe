import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas'; 
import rootReducer from '../reducers'




const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const configureStore = () => {
  const store =  createStore(
    combineReducers({
      entries: rootReducer
    }),
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  )
  sagaMiddleware.run(rootSaga)
  return store;
}

export default configureStore;