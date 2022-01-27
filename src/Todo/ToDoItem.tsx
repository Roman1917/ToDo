import React, { useState, useEffect, useCallback } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TextField from "@mui/material/TextField";
import { ITodoItem } from "../types";

const ToDoItem = ({ item, removeTodo, onCompleted, editTodo }: ITodoItem) => {
  const [editing, setEditing] = useState<boolean>(false);

  const [changedText, setChangedText] = useState<string>("");

  const handleRemoveToDo = () => {
    removeTodo(item.id);
  };

  useEffect(() => {
    setChangedText(item.text);
  }, []);

  const handleEditing = () => {
    setEditing(true);
  };

  const handleEditingDone = (event: any) => {
    if (event.keyCode === 13) {
      setEditing(false);

      editTodo(item.id, item.completed, changedText, item.time);
    }
  };

  const handleEditingChange = (event: any) => {
    const _changedText = event.target.value;
    setChangedText(_changedText);
  };
  const completedCallBack = useCallback(() => {
    onCompleted(item.id, item.completed, item.text, item.time);
  }, [item.completed]);

  return (
    <li>
      {editing ? (
        <div id="item">
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="editInput "
            type="text"
            value={changedText}
            onChange={handleEditingChange}
            onKeyDown={handleEditingDone}
          />
        </div>
      ) : (
        <div id="item">
          <div className={item.completed ? "done" : ""}>
            <input
              className="input2"
              id="input2"
              type="checkbox"
              checked={item.completed}
              onChange={completedCallBack}
            />
            {changedText}
          </div>

          <div className="tools">
            <div className="time">{item.time}</div>

            <div className="edit">
              <div className="spanpencil">
                <BorderColorIcon
                  className="pencil"
                  onClick={handleEditing}
                ></BorderColorIcon>
              </div>
            </div>
            <div>
              <a
                href="#"
                type="submit"
                className="rm"
                onClick={handleRemoveToDo}
              >
                &times;
              </a>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ToDoItem;
