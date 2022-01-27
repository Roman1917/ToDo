import { localHost } from "../constantsTodo";

const API = {
  addTodo: (payload) => {
    return fetch(`${localHost}/todo/todo/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization-Token": localStorage.getItem("accessToken"),
        "Refresh-Token": localStorage.getItem("refreshToken"),
      },
      body: JSON.stringify(payload),
    });
  },
  getTodo: () => {
    return fetch(`${localHost}/todo/todo/gettask`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization-Token": localStorage.getItem("accessToken"),
        "Refresh-Token": localStorage.getItem("refreshToken"),
      },
    });
  },
  editTodo: (payload) => {
    return fetch(`${localHost}/todo/todo/edittask/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization-Token": localStorage.getItem("accessToken"),
        "Refresh-Token": localStorage.getItem("refreshToken"),
      },
      body: JSON.stringify({
        id: payload.id,
        text: payload.text,
      }),
    });
  },
  toggleTodo: (payload) => {
    return fetch(`${localHost}/todo/todo/toggletask/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization-Token": localStorage.getItem("accessToken"),
        "Refresh-Token": localStorage.getItem("refreshToken"),
      },
      body: JSON.stringify({
        id: payload.id,
        completed: payload.completed,
      }),
    });
  },
  deleteTodo: (payload) => {
    return fetch(`${localHost}/todo/todo/deletetask/${payload}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization-Token": localStorage.getItem("accessToken"),
        "Refresh-Token": localStorage.getItem("refreshToken"),
      },
    });
  },
  refreshToken: () => {
    return fetch(`${localHost}/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Refresh-Token": localStorage.getItem("refreshToken"),
      },
      body: JSON.stringify({}),
    });
  },
};

export default API;
