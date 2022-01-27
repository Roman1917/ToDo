import { IActions } from "../types";
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  SET_TODOLIST_FILTER,
  EDIT_TODO,
  FETCH_TODO,
  ADD_USER,
} from "../constantsTodo";

export const addTodo = ({ itemText, timeAdd, userID }: IActions) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    completed: false,
    text: itemText,
    time: timeAdd,
    userID: userID,
  },
});

export const removeTodo = (id: string) => {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
};

export const toggleTodo = (
  id: string,
  completed: boolean,
  text: string,
  time: string
) => ({
  type: TOGGLE_TODO,
  payload: {
    id: id,
    completed: completed,
    text: text,
    time: time,
  },
});

export const editTodo = (
  id: string,
  completed: boolean,
  text: string,
  time: string
) => {
  return {
    type: EDIT_TODO,
    payload: {
      id: id,
      completed: completed,
      text: text,
      time: time,
    },
  };
};
export const todolistFilter = (filter: string) => ({
  type: SET_TODOLIST_FILTER,
  filter: filter,
});

export const fetchTodo = () => ({
  type: FETCH_TODO,
});

export const addUser = (
  email: string,
  userID: string,
  tokenAccess: string,
  tokenRefresh: string
) => {
  return {
    type: ADD_USER,
    payload: {
      email: email,
      userID: userID,
      tokenAccess: tokenAccess,
      tokenRefresh: tokenRefresh,
    },
  };
};
