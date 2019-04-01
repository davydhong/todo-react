import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

function inCompleteTask(props) {
  return (
    <ListItemText>
      <a>{props.children}</a>
    </ListItemText>
  );
}

inCompleteTask.propTypes = {
  children: PropTypes.node.isRequired
};

function completeTask(props) {
  return (
    <ListItemText>
      <strike>{props.children}</strike>
    </ListItemText>
  );
}

completeTask.propTypes = {
  children: PropTypes.node.isRequired
};

export function TodoList({ todos, handleIconClick }) {
  return (
    <List style={{ listStyle: "none" }}>
      {todos.map((todo, idx) => {
        const TodoRenderer = todo.isComplete ? completeTask : inCompleteTask;
        return (
          <ListItem key={idx} idx={todo.id}>
            <input
              type="checkbox"
              name="isComplete"
              checked={todo.isComplete}
              onChange={handleIconClick}
            />
            <TodoRenderer>{todo.task}</TodoRenderer>
            <a name="isDeleted" onClick={handleIconClick}>
              {todo.isDeleted ? <RefreshIcon /> : <DeleteIcon />}
            </a>
          </ListItem>
        );
      })}
    </List>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array,
  handleIconClick: PropTypes.function
};

export default withStyles(styles)(TodoList);
