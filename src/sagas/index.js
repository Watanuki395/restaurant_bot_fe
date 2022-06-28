import { all, fork } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import registerSaga from './registerSaga';
import forgotpassSaga from './forgotpassSaga';
import refreshTokenSaga from './refreshTokenSaga';
import categoriesSaga from './categoriesSaga';
import productByCategorySaga from './productobycategorySaga';
import selectComponentSaga from './selectcomponentSagas';
import products from './productsSaga';
import createCategorySaga from './createcategorySaga';
import createProductSaga from './createproductSaga';
import deleteCategorySaga from './deletecategorySaga';
import editCategorySaga from './editcategorySaga';
import deleteProductSaga from './deleteproductSaga';
import editProductSaga from './editproductSaga';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registerSaga),
    fork(refreshTokenSaga),
    fork(forgotpassSaga),
    fork(categoriesSaga),
    fork(productByCategorySaga),
    fork(selectComponentSaga),
    fork(products),
    fork(createCategorySaga),
    fork(createProductSaga),
    fork(deleteCategorySaga),
    fork(editCategorySaga),
    fork(deleteProductSaga),
    fork(editProductSaga)
  ]);
}