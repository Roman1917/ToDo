import React, { useState, useMemo, useCallback, useEffect } from "react";
import TodoFooter from "./Components/TodoFooter";
import TodoInput from "./Components/TodoInput";
import ToDoItem from "./ToDoItem";
import { connect, useSelector, useDispatch } from "react-redux";
import TimeNow from "./helpers";
import { ITodoList, ITodo, setFilter } from "../types";
import {
  todoListSelector,
  filterSelector,
  selectTodoListByFilter,
} from "../CreateSelectors";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  todolistFilter,
  editTodo,
  fetchTodo,
} from "../Actions/ActionsTodoList";
import store from "../index";

const TodoList = ({ navigation }: ITodoList) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const todoList: any = useSelector(todoListSelector);

  const filter: any = useSelector(filterSelector);

  const FilteredList: any = useSelector(selectTodoListByFilter({ filter }));

  const [itemText, setitemText] = useState<string>("");

  const handleAddTask = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (itemText) {
      const timeAdd = TimeNow();
      const userID = store.getState().User.user.userID;
      dispatch(addTodo({ itemText, timeAdd, userID }));
      setitemText("");
    }
  };

  const userName = () => {
    const userName = store.getState().User.user.email;
    return userName;
  };
  const handleChangeText = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setitemText(event.target.value);
  };
  const toDoToggle = useCallback(
    (id, completed, text, time) =>
      dispatch(toggleTodo(id, completed, text, time)),
    [dispatch]
  );

  const removeTodo1 = useCallback(
    (id) => {
      dispatch(removeTodo(id));
    },
    [dispatch]
  );

  const editTodo1 = useCallback(
    (id, completed, text, time) =>
      dispatch(editTodo(id, completed, text, time)),
    [dispatch]
  );

  const todoAll = () => {
    dispatch(todolistFilter(setFilter.SHOW_ALL));
  };
  const todoActive = () => {
    dispatch(todolistFilter(setFilter.SHOW_ACTIVE));
  };
  const todoCompleted = () => {
    dispatch(todolistFilter(setFilter.SHOW_COMPLETED));
  };

  const todoFilteredMas = useMemo(() => {
    return FilteredList;
  }, [filter, todoList]);

  return (
    <div className="wrapper">
      <div>
        <h1 className="head">todos</h1>
        <form className="form" id="form" onSubmit={handleAddTask}>
          <TodoInput itemText={itemText} handleChangeText={handleChangeText} />
          <ul className="todos" id="todos">
            {todoFilteredMas.map((item: ITodo) => {
              return (
                <ToDoItem
                  item={item}
                  key={item.id}
                  onCompleted={toDoToggle}
                  removeTodo={removeTodo1}
                  editTodo={editTodo1}
                />
              );
            })}
          </ul>

          <TodoFooter
            todoList={todoList}
            filter={filter}
            todoAll={todoAll}
            todoActive={todoActive}
            todoCompleted={todoCompleted}
          />
        </form>
      </div>
      <div className="logout" onClick={() => navigation.navigate("Login")}>
        <p>{`User: ${userName()}    Logout!`}</p>
        <br />
      </div>
    </div>
  );
};

export default connect(null, null)(TodoList);
