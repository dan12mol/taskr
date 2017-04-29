import React from 'react';
import base from '../base';

class TodoList extends React.Component {

  constructor() {
    super();

    this.state = {
      items: {}
    };
  }

  componentDidMount() {
    
    const projectId = this.context.match.parent.params.projectId;
    const listName = this.context.match.parent.params.listName;

    this.ref = base.syncState(`users/${this.props.uid}/todos/${projectId}/${listName}`, {
      context: this,
      state: 'items'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <p>TODOLIST</p>
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
