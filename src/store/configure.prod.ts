import { Store, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
import { connectRouter, routerMiddleware } from "connected-react-router";
// If you use react-router, don't forget to pass in your history type.
import { History } from "history";

// Import the state interface and our combined reducers/sagas.
import { ApplicationState, DefaultState, rootReducer, rootSaga } from "./root";

export default function configureStore(
  history: History
): Store<ApplicationState> {
  // create the redux-saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    connectRouter(history)(rootReducer),
    DefaultState,
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  );

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga);
  return store;
}
