import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import NomList from './components/nom-list';

ReactDOM.render(
  <Provider store={store}>
    <NomList />
  </Provider>,
  document.getElementById('root')
);
