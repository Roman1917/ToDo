import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import Todo from "./ReduxLogic/ReducerTodoList";
import User from "./ReduxLogic/ReducerUser";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ User, Todo });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
export default store;
sagaMiddleware.run(rootSaga);
