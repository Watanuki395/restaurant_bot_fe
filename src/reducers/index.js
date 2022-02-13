import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';
import forgotpass from './forgotpassReducer'

const rootReducer = combineReducers({
  register, 
  login, 
  forgotpass
});

export default rootReducer;