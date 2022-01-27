import { IFooter } from "../../types";
import { SHOW_ACTIVE, SHOW_COMPLETED, SHOW_ALL } from "../../constantsTodo";

const TodoFooter = ({
  todoList,
  todoAll,
  todoActive,
  todoCompleted,
  filter,
}: IFooter) => {
  return (
    <footer id="Footer">
      <div className="footerButtons">
        <div>
          <span className="count">{todoList.length} Items Left</span>
        </div>
        <div>
          <span
            className={`All but ${filter === SHOW_ALL ? "actives" : ""}`}
            onClick={todoAll}
          >
            All
          </span>
          <span
            className={`Active but ${filter === SHOW_ACTIVE ? "actives" : ""}`}
            onClick={todoActive}
          >
            Active
          </span>

          <span
            className={`Completed but ${
              filter === SHOW_COMPLETED ? "actives" : ""
            }`}
            onClick={todoCompleted}
          >
            Completed
          </span>
        </div>
      </div>
      <p>Double-click to edit a todo</p>
      <p>
        Created by
        <a href="http://twitter.com/oscargodson"> Oskar Godson</a>
      </p>
      <p>
        Refactored by
        <a href="https://github.com/cburgmer"> Christoph Burgmer</a>
      </p>
      <p>
        Part of <a href="http://todomvc.com/">TodoMVC</a>
      </p>
    </footer>
  );
};

export default TodoFooter;
