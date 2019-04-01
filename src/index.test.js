import React from 'react';
import { App, TodoEntryNode } from './index';
import { FilterSelection, filteredTodos } from './FilterSelection';
import { TodoList } from './TodoList';
import { shallow, mount } from 'enzyme';

describe('<App/>', () => {
  it('the state starts with three todo entries', () => {
    const wrapper = shallow(<App />);
    const state = wrapper.state();
    expect(state.todos[0]).toBeInstanceOf(TodoEntryNode);
    expect(state.todos).toHaveLength(3);
    expect(state.filter).toBe('notDeleted');
  });

  it('renders filter selection and todolist', () => {
    const wrapper = shallow(<App />);
    const state = wrapper.state();
    const listWrapper = shallow(
      <TodoList
        todos={filteredTodos(state.todos, state.filter)}
        handleIconClick={wrapper.handleIconClick}
      />
    );
    expect(wrapper.contains('#inputTask')).toBeTruthy;
    expect(wrapper.contains(<FilterSelection />)).toBeTruthy;
    expect(wrapper.contains(<TodoList />)).toBeTruthy;
    expect(listWrapper.find('.todoEntry')).toHaveLength(3);
  });

  it('can add todo entry node to the state', () => {
    const wrapper = mount(<App />);
    const textBox = wrapper.find('#inputTask');
    textBox.simulate('keypress', {
      persist: () => {},
      key: 'Enter',
      target: { value: 'adding fourth task' }
    });
    expect(wrapper.state().todos).toHaveLength(4);
    expect(wrapper.find('li.todoEntry')).toHaveLength(4);
    textBox.simulate('keypress', {
      persist: () => {},
      key: 'Enter',
      target: { value: 'adding fifth task' }
    });
    expect(wrapper.state().todos).toHaveLength(5);
    expect(wrapper.find('li.todoEntry')).toHaveLength(5);
    wrapper.unmount();
  });

  test.skip('can mark entries complete/deleted', () => {
    // omitted due to mock event object size
  });

  it('can filter by complete/delete', () => {
    const wrapper = mount(<App />);
    const selector = wrapper.find('#FilterSelection');
    const todos = wrapper.state().todos;

    selector.simulate('change', { target: { value: 'inComplete' } });
    expect(wrapper.find('li.todoEntry')).toHaveLength(3);
    selector.simulate('change', { target: { value: 'complete' } });
    expect(wrapper.find('li.todoEntry')).toHaveLength(0);
    selector.simulate('change', { target: { value: 'deleted' } });
    expect(wrapper.find('li.todoEntry')).toHaveLength(0);

    const completeEntry = new TodoEntryNode('this entry is complete', 3);
    completeEntry.isComplete = true;
    const deletedEntry = new TodoEntryNode('this entry is deleted', 4);
    deletedEntry.isDeleted = true;

    wrapper.setState({
      todos: [...todos, completeEntry, deletedEntry]
    });

    selector.simulate('change', { target: { value: 'inComplete' } });
    expect(wrapper.find('li.todoEntry')).toHaveLength(3);
    selector.simulate('change', { target: { value: 'complete' } });
    expect(wrapper.find('li.todoEntry')).toHaveLength(1);
    selector.simulate('change', { target: { value: 'deleted' } });
    expect(wrapper.find('li.todoEntry')).toHaveLength(1);

    wrapper.unmount();
  });
});
