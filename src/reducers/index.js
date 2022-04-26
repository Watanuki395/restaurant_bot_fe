import { combineReducers } from 'redux';
import register from './registerReducer';
import auth from './loginReducer';
import forgotpass from './forgotpassReducer';
import categories from './categoriesReducer';
import productbycategory from './productbycategoryReducer';
import selectcomponent from './selectcomponentReducer';

const rootReducer = combineReducers({
  register, 
  auth, 
  forgotpass,
  categories,
  productbycategory,
  selectcomponent
});

export default rootReducer;