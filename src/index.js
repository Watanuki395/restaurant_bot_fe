import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

//import './index.css';
import App from './container/App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import configureStore from '../src/store/configureStore'
import createStore from '../src/store/configureStore'

const store = createStore()

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

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

