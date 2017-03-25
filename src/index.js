import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
const store = configureStore();

import App from './components/App';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// import { requestContainers } from './actions/container';
// store.dispatch(requestContainers());
