import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './container/App';

//import configureStore from '../src/store/configureStore'
import createStore from '../src/store/configureStore'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

