import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './container/App';
import 'bootstrap/dist/css/bootstrap.min.css';

//import configureStore from '../src/store/configureStore'
import createStore from '../src/store/configureStore'
import * as serviceWorker from './serviceWorker';

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
  serviceWorker.register();

