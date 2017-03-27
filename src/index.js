import 'bulma/css/bulma.css';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import persist from './persist';
const store = configureStore();
persist(store);

import App from './components/App';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
