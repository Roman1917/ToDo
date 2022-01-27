export interface IActions {
  itemText: string;
  timeAdd: string;
  userID: string;
}

export interface ITodoList {
  addTodo: (itemText: string, timeAdd: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  todolistFilter: (e: string) => void;
  filter: string;
  id: number;
  text: string;
  navigation: any;
}
export interface ITodo {
  completed: boolean;
  id: number;
  time: string;
  text: string;
}

export interface IInitialState {
  todoList: any;
  filter: string;
}
export interface TodoListActionTypes {
  type: string;
  filter: string;
  id: number;
  itemTodo: { id: number; completed: boolean; text: string; time: string };
  payload: {
    id?: number;
    completed?: boolean;
    text?: string;
    time?: string;
    filter?: string;
  };
}

export interface IFooter {
  todoList: [];
  todoAll: () => void;
  todoActive: () => void;
  todoCompleted: () => void;
  filter: string;
}
export interface IInput {
  itemText: string;
  handleChangeText: any;
}
export interface ITodoItem {
  removeTodo: (id: number) => void;
  onCompleted: (
    id: number,
    completed: boolean,
    text: string,
    time: string
  ) => void;
  editTodo: (
    id: number,
    completed: boolean,
    text: string,
    time: string
  ) => void;
  item: {
    id: number;
    completed: boolean;
    text: string;
    time: string;
  };
}

export enum setFilter {
  SHOW_ALL = "SHOW_ALL",
  SHOW_COMPLETED = "SHOW_COMPLETED",
  SHOW_ACTIVE = "SHOW_ACTIVE",
}
