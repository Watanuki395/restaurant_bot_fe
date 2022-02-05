import { createStore, applyMiddleware, compose as origCompose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import registerReducer from '@Reducers/registerReducer'
import sagas from '../sagas/registerSaga'
/* import rootReducer from '../reducers';
import rootSaga from '../sagas'; */

const compose = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || origCompose
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  (state, action) => state,
  compose(applyMiddleware(sagaMiddleware))
);

store.addReducers({
  registerReducer
});

sagaMiddleware.run(sagas)


/* import sagas from './sagas'

const compose = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || origCompose
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  (state, action) => state,
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(sagaMiddleware))
)

// Initially loaded reducers.
store.addReducers({
  app,
  auth,
  cost,
  error,
  gp,
  kpi,
  blackout,
  gpb,
  rcbe,
  csv,
  fy,
  sor,
  sorClient,
  roadmap,
  insights,
  model,
  status,
  labor,
  laborScorecard,
  laborDelegation,
  revenue,
  summary,
  accountDelegation,
  opex,
  sales,
  drillDown,
  dr,
  drillDownSignings,
  drillDownGp,
  userPreferences,
  financialCommitment,
  managementReport,
  intervalReport,
  periodReport,
  bluepages
})

sagaMiddleware.run(sagas) */
