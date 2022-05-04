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
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
        </Provider>
      </AuthProvider>
    </BrowserRouter>,
  document.getElementById("root")
);
//serviceWorker.register();

