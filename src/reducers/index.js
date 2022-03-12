import { combineReducers } from 'redux';
import register from './registerReducer';
import auth from './loginReducer';
import forgotpass from './forgotpassReducer'

const rootReducer = combineReducers({
  register, 
  auth, 
  forgotpass
});

export default rootReducer;