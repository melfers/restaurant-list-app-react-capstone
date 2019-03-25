import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import NomApp from './app.js';

import '../src/styles.css';

ReactDOM.render(
  <Provider store={store}>
    <NomApp />
  </Provider>,
  document.getElementById('root')
);
