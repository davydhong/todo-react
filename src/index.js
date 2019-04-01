import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./TodoList";
import { FilterSelection, filteredTodos } from "./FilterSelection";

export class TodoEntryNode {
  constructor(task, id) {
    this.task = task;
    this.id = id;
    this.isComplete = false;
    this.isDeleted = false;
  }
}

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [
        new TodoEntryNode("Submit Deliverr Tech Challenge", 0),
        new TodoEntryNode("Deliverr Onsite", 1),
        new TodoEntryNode("Get the job", 2)
      ],
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
          // reset input field after setState
          e.target.value = "";
        }
      );
    }
  }

  handleIconClick(e) {
    e.persist();
    // getting index and the prop (isComplete/isDeleted) of the entry node
    // checkbox and the svg icon has different DOM structure
    const entryIndex =
      e.target.tagName === "INPUT"
        ? e.target.parentNode.getAttribute("idx")
        : e.target.parentNode.parentNode.getAttribute("idx") ||
          e.target.parentNode.parentNode.parentNode.getAttribute("idx");
    const entryProp =
      e.target.tagName === "INPUT"
        ? e.target.getAttribute("name")
        : e.target.parentNode.getAttribute("name") ||
          e.target.parentNode.parentNode.getAttribute("name");

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
        <TodoList
          todos={filteredTodos(this.state.todos, this.state.filter)}
          handleIconClick={this.handleIconClick}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
