import { all } from "redux-saga/effects";
import listsagas from "./lists";

function* rootSaga() {
  yield all([...listsagas]);
}

export default rootSaga;
