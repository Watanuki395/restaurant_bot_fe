import { all, fork } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import registerSaga from './registerSaga';
import forgotpassSaga from './forgotpassSaga';
import refreshTokenSaga from './refreshTokenSaga';
import categoriesSaga from './categoriesSaga';
import selectComponentSaga from './selectcomponentSagas';
import productsSaga from './productsSaga';
import createCategorySaga from './createcategorySaga';
import deleteCategorySaga from './deletecategorySaga';
import editCategorySaga from './editcategorySaga';
import editProductSaga from './editproductSaga';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registerSaga),
    fork(refreshTokenSaga),
    fork(forgotpassSaga),
    fork(categoriesSaga),
    fork(selectComponentSaga),
    fork(productsSaga),
    fork(createCategorySaga),
    fork(deleteCategorySaga),
    fork(editCategorySaga),
    fork(editProductSaga)
  ]);
}