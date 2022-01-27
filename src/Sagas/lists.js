import { call, put, takeEvery } from "redux-saga/effects";
import API from "../Api/Api";
import {
  ADD_TODO,
  GET_TODO_SUCCESS,
  EDIT_TODO,
  EDIT_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  FETCH_TODO,
  FETCH_TODO_SUCCESS,
  REMOVE_TODO,
  TOGGLE_TODO_SUCCESS,
  TOGGLE_TODO,
} from "../constantsTodo";
import store from "../index";

function* RefTokens() {
  const response = yield call(API.refreshToken, JSON.stringify());
  const data = yield response.json();
  localStorage.setItem("accessToken", data.user.accessToken);
  localStorage.setItem("refreshToken", data.user.refreshToken);
}

function* getTodos(action, Reducer) {
  const res = yield call(API.getTodo, JSON.stringify(action.payload));
  try {
    if (res.status === 200) {
    }
    const todoList = yield res.json();
    const userID = store.getState().User.user.userID;
    const list = todoList.todo.filter((item) => {
      return (item.status === 1 || item.status === 2) && item.userID === userID;
    });

    const preparedList = list.map((item) => {
      return {
        ...item,
        id: item._id,
      };
    });

    const payload = preparedList;
    yield put({ type: Reducer, payload });
  } catch (err) {
    if (res.status === 401) {
      yield call(RefTokens);
      console.log(
        "🚀 ~ file: lists.js ~ line 42 ~ function*getTodos ~ err",
        err
      );
    }
  }
}
function* fetchTodo(action) {
  try {
    yield call(getTodos, action, FETCH_TODO_SUCCESS);
  } catch (err) {
    console.log("🚀 ~ file: lists.js ~ line 40 ~ err", err);
  }
}

function* addList(action) {
  try {
    yield call(API.addTodo, action.payload);
    yield call(getTodos, action, GET_TODO_SUCCESS);
  } catch (error) {
    yield call(RefTokens);
    console.log(
      "🚀 ~ file: lists.js ~ line 49 ~ function*addList ~ error",
      error
    );
  }
}

function* deleteTodo(action) {
  try {
    yield call(API.deleteTodo, action.payload);
    yield call(getTodos, action, DELETE_TODO_SUCCESS);
  } catch (err) {
    yield call(RefTokens);
    console.log("🚀 ~ file: lists.js ~ line 61 ~ err", err);
  }
}

function* editTodo(action) {
  try {
    yield call(API.editTodo, action.payload);
    yield call(getTodos, action, EDIT_TODO_SUCCESS);
  } catch (err) {
    yield call(RefTokens);
    console.log("🚀 ~ file: lists.js ~ line 96 ~ err", err);
  }
}

function* toggleTodo(action) {
  try {
    yield call(API.toggleTodo, action.payload);
    yield call(getTodos, action, TOGGLE_TODO_SUCCESS);
  } catch (err) {
    yield call(RefTokens);
    console.log("🚀 ~ file: lists.js ~ line 79 ~ err", err);
  }
}

function* watchFetchtodo() {
  yield takeEvery(FETCH_TODO, fetchTodo);
}

function* watchAddTodo() {
  yield takeEvery(ADD_TODO, addList);
}

function* watchDeleteTodo() {
  yield takeEvery(REMOVE_TODO, deleteTodo);
}

function* watchEditTodo() {
  yield takeEvery(EDIT_TODO, editTodo);
}

function* watchToggleTodo() {
  yield takeEvery(TOGGLE_TODO, toggleTodo);
}

export default [
  watchAddTodo(),
  watchFetchtodo(),
  watchDeleteTodo(),
  watchEditTodo(),
  watchToggleTodo(),
];
