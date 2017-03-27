import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './ducks';
import saga from './sagas';
import createSagaMiddleware from 'redux-saga';

export default function makeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(saga);
  return store;
}
