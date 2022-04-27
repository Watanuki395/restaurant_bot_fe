import { all, fork } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import registerSaga from './registerSaga';
import forgotpassSaga from './forgotpassSaga';
import categoriesSaga from './categoriesSaga';
import productByCategorySaga from './productobycategorySaga';
import selectComponentSaga from './selectcomponentSagas';
import products from './productsSaga';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registerSaga),
    fork(forgotpassSaga),
    fork(categoriesSaga),
    fork(productByCategorySaga),
    fork(selectComponentSaga),
    fork(products)
  ]);
}