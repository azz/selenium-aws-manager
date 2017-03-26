import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/root';
import { watchFetchImages } from './actions/image';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

export default _ => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware))
  );
  sagaMiddleware.run(watchFetchImages);

  return store;
};
