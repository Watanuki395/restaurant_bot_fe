import { combineReducers } from 'redux';
import register from './registerReducer';
import auth from './loginReducer';
import forgotpass from './forgotpassReducer'
import refreshtoken from './refreshTokenReducer'
import categories from './categoriesReducer';
import selectcomponent from './selectcomponentReducer';
import products from './productsReducer';

const rootReducer = combineReducers({
  register, 
  auth, 
  refreshtoken,
  forgotpass,
  categories,
  selectcomponent,
  products
});

export default rootReducer;