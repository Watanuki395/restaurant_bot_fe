import { combineReducers } from 'redux';
import register from './registerReducer';
import auth from './loginReducer';
import forgotpass from './forgotpassReducer';
import categories from './categoriesReducer';
import productbycategory from './productbycategoryReducer'

const rootReducer = combineReducers({
  register, 
  auth, 
  forgotpass,
  categories,
  productbycategory
});

export default rootReducer;