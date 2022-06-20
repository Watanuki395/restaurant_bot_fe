import { combineReducers } from 'redux';
import register from './registerReducer';
import auth from './loginReducer';
import forgotpass from './forgotpassReducer';
import categories from './categoriesReducer';
import productbycategory from './productbycategoryReducer';
import selectcomponent from './selectcomponentReducer';
import products from './productsReducer';
import createcategory from './createcategoryReducer';
import createproduct from './createproductReducer';
import deleteCategory from './deletecategoryReducer';
import editCategory from './editcategoryReducer';
import deleteProduct from './deleteproductReducer';
import editProduct from './editproductReducer';

const rootReducer = combineReducers({
  register, 
  auth, 
  forgotpass,
  categories,
  productbycategory,
  selectcomponent,
  products,
  createcategory,
  createproduct,
  deleteCategory,
  editCategory,
  deleteProduct,
  editProduct
});

export default rootReducer;