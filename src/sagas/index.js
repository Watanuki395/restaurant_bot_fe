import { all, fork } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import registerSaga from './registerSaga';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registerSaga)
  ]);
}