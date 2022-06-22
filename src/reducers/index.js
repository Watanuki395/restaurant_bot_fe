import { combineReducers } from 'redux';
import register from './registerReducer';
import auth from './loginReducer';
import forgotpass from './forgotpassReducer'
import refreshtoken from './refreshTokenReducer'

const rootReducer = combineReducers({
  register, 
  auth, 
  forgotpass,
  refreshtoken
});

export default rootReducer;