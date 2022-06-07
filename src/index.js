import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './container/App';

import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import configureStore from '../src/store/configureStore'
import createStore from '../src/store/configureStore'

const store = createStore()



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
//serviceWorker.register();

