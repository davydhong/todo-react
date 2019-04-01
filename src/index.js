import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { TodoList } from "./TodoList";
import { FilterSelection, filteredTodos } from "./FilterSelection";

class TodoEntryNode {
  constructor(task, id) {
    this.task = task;
    this.id = id;
    this.isComplete = false;
    this.isDeleted = false;
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [new TodoEntryNode("first todo", 0)],
      filter: "notDeleted" //options:  notDeleted (default), complete(&& notDeleted), deleted
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleUpdateFilter = this.handleUpdateFilter.bind(this);
  }

  handleAddTodo(e) {
    if (e.key === "Enter") {
      e.persist();
      this.setState(
        {
          todos: [
            ...this.state.todos,
            new TodoEntryNode(e.target.value, this.state.todos.length)
          ]
        },
        () => {
          // reset input field after enter is pressed
          e.target.value = "";
        }
      );
    }
  }

  handleIconClick(e) {
    e.persist();
    const entryIndex = e.target.parentNode.getAttribute("idx");
    const entryProp = e.target.getAttribute("name");
    const updatedTodos = [...this.state.todos];
    updatedTodos[entryIndex][entryProp] = !updatedTodos[entryIndex][entryProp];
    this.setState({
      todos: updatedTodos
    });
  }

  handleUpdateFilter(e) {
    e.persist();
    this.setState({
      filter: e.target.value
    });
  }

  render() {
    return (
      <div>
        <FilterSelection handleUpdateFilter={this.handleUpdateFilter} />
        <br />
        <br />
        <input type="text" id="inputTask" onKeyPress={this.handleAddTodo} />
        <ul style={{ listStyle: "none" }}>
          <TodoList
            todos={filteredTodos(this.state.todos, this.state.filter)}
            handleIconClick={this.handleIconClick}
          />
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
