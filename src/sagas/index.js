import { all, fork } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import registerSaga from './registerSaga';
import forgotpassSaga from './forgotpassSaga';
import refreshTokenSaga from './refreshTokenSaga';


export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registerSaga),
    fork(forgotpassSaga),
    fork(refreshTokenSaga)
  ]);
}