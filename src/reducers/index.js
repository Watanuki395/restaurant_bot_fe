import { combineReducers } from 'redux';
import register from './registerReducer';
import auth from './loginReducer';
import forgotpass from './forgotpassReducer'
import refreshtoken from './refreshTokenReducer'
import categories from './categoriesReducer';
import selectcomponent from './selectcomponentReducer';
import products from './productsReducer';
import createcategory from './createcategoryReducer';
import deleteCategory from './deletecategoryReducer';
import editCategory from './editcategoryReducer';
import editProduct from './editproductReducer';

const rootReducer = combineReducers({
  register, 
  auth, 
  refreshtoken,
  forgotpass,
  categories,
  selectcomponent,
  products,
  createcategory,
  deleteCategory,
  editCategory,
  editProduct
});

export default rootReducer;