import { createSelector } from "reselect";
import { ITodo } from "./types";
import { SHOW_ACTIVE, SHOW_COMPLETED } from "./constantsTodo";

export const todoListSelector = createSelector(
  (state: any) => state.Todo.todoList,
  (todoList: any) => todoList
);
export const filterSelector = createSelector(
  (state: any) => state.Todo.filter,
  (filter: any) => filter
);

export const selectTodoListByFilter = ({ filter }: { filter: string }) =>
  createSelector(todoListSelector, (todo) => {
    if (filter === SHOW_COMPLETED) {
      return todo.filter((todo: ITodo) => todo.completed !== false);
    }
    if (filter === SHOW_ACTIVE) {
      return todo.filter((todo: ITodo) => todo.completed !== true);
    } else return todo;
  });
