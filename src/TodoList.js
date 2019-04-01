import React from "react";

function inCompleteTask(props) {
  return <a>{props.children}</a>;
}

function completeTask(props) {
  return <strike>{props.children}</strike>;
}

export function TodoList({ todos, handleIconClick }) {
  return todos.map((todo, idx) => {
    const TodoRenderer = todo.isComplete ? completeTask : inCompleteTask;
    return (
      <li key={idx} idx={todo.id}>
        <input
          type="checkbox"
          id="todoIsComplete"
          name="isComplete"
          checked={todo.isComplete}
          onChange={handleIconClick}
        />
        <TodoRenderer>{todo.task}</TodoRenderer> {"  "}
        <a name="isDeleted" onClick={handleIconClick}>
          {todo.isDeleted ? "RESTORE" : "DELETE"}
        </a>
      </li>
    );
  });
}
