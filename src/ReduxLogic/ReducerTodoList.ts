import { IInitialState, TodoListActionTypes, ITodo } from "../types";
import {
  SET_TODOLIST_FILTER,
  GET_TODO_SUCCESS,
  EDIT_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  FETCH_TODO_SUCCESS,
  TOGGLE_TODO_SUCCESS,
} from "../constantsTodo";
const initialState: IInitialState = { todoList: [], filter: "SHOW_ALL" };

export const Todo = (
  state = initialState,
  action: TodoListActionTypes
): IInitialState => {
  switch (action.type) {
    case SET_TODOLIST_FILTER: {
      return { ...state, filter: action.filter };
    }

    case GET_TODO_SUCCESS: {
      return { ...state, todoList: action.payload };
    }

    case EDIT_TODO_SUCCESS: {
      return {
        ...state,
        todoList: action.payload,
      };
    }
    case TOGGLE_TODO_SUCCESS: {
      return { ...state, todoList: action.payload };
    }

    case DELETE_TODO_SUCCESS: {
      return {
        ...state,
        todoList: action.payload,
      };
    }

    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        todoList: action.payload,
      };

    default:
      return state;
  }
};

export default Todo;
