import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App/App.js';
import Provider from './providers/generalProvider';

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
