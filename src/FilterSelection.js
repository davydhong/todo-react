import React from "react";
import PropTypes from "prop-types";

export function filteredTodos(todos, filter) {
  return todos.filter(todo => {
    switch (filter) {
      case "notDeleted":
        return !todo.isDeleted;
      case "inComplete":
        return !todo.isDeleted && !todo.isComplete;
      case "complete":
        return !todo.isDeleted && todo.isComplete;
      case "deleted":
        return todo.isDeleted;
      default:
        return todo;
    }
  });
}

export function FilterSelection({ handleUpdateFilter }) {
  return (
    <select onChange={handleUpdateFilter}>
      <option value="notDeleted">Not Deleted (default)</option>
      <option value="inComplete">Incomplete</option>
      <option value="complete">Complete</option>
      <option value="deleted">Deleted</option>
    </select>
  );
}
