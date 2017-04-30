import React from 'react';
import base from '../base';

import AddItem from './AddItem';
import Item from './Item'
import Completed from './Completed';

class TodoList extends React.Component {

  constructor() {
    super();

    this.addItem = this.addItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.uncheckItem = this.uncheckItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.state = {
      items: {},
      completed: {}
    };
  }

  componentDidMount() {
    
    const projectId = this.context.match.parent.params.projectId;
    const listName = this.context.match.parent.params.listName;

    this.itemsRef = base.syncState(`users/${this.props.uid}/todos/${projectId}/${listName}/items`, {
      context: this,
      state: 'items'
    });
    this.completedItemsRef = base.syncState(`users/${this.props.uid}/todos/${projectId}/${listName}/completed`, {
      context: this,
      state: 'completed'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.itemsRef);
    base.removeBinding(this.completedItemsRef);
  }

  addItem(item) {

    const items = {...this.state.items};
    const timestamp = Date.now();

    items[`item-${timestamp}`] = item;

    this.setState({ items });
  }

  checkItem(key) {

    const items = {...this.state.items};
    const item = items[key];

    items[key] = null;

    const completed = {...this.state.completed};
    completed[key] = item;

    this.setState({
      items,
      completed
    });

  }

  uncheckItem(key) {

    const completed = {...this.state.completed};
    const item = completed[key];

    completed[key] = null;

    const items = {...this.state.items};
    items[key] = item;

    this.setState({
      items,
      completed
    });

  }

  removeItem(key, listName) {
    const list = {...this.state[listName]};

    list[key] = null;

    this.setState({
      [listName]: list
    });
  }

  render() {
    return (
      <div className="TodoList">
        <AddItem addItem={this.addItem} />
        <div className="items">
          {
            Object.keys(this.state.items)
              .map(key => this.state.items[key] ? <Item key={key} index={key} items={this.state.items} checkItem={this.checkItem} removeItem={this.removeItem} /> : '')
          }
        </div>
        <h1>Completed</h1>
        <div className="completed-items">
          {
            Object.keys(this.state.completed)
              .map(key => this.state.completed[key] ? <Completed key={key} index={key} completed={this.state.completed} uncheckItem={this.uncheckItem} removeItem={this.removeItem} /> : '')
          }
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  uid: React.PropTypes.string.isRequired
}

TodoList.contextTypes = {
  match: React.PropTypes.object.isRequired
}

export default TodoList
