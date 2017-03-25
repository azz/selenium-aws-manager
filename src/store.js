import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/root';
import thunkMiddleware from 'redux-thunk';

export default _ => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
};
