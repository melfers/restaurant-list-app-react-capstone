import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import NomApp from './app.js';

ReactDOM.render(
  <Provider store={store}>
    <NomApp />
  </Provider>,
  document.getElementById('root')
);
