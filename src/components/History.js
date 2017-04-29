import React from 'react';
import base from '../base';

class History extends React.Component {

  constructor() {
    super();

    this.state = {
      lists: {}
    };
  }

  componentDidMount() {

    const projectId = this.context.match.parent.params.projectId;

    this.ref = base.syncState(`users/${this.props.uid}/todos/${projectId}`, {
      context: this,
      state: 'lists'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div className="History">
        <h1>History</h1>
        <ul>
          {
            Object.keys(this.state.lists)
              .map(key => <li key={key}>{key}</li>)
          }
        </ul>
      </div>
    )
  }
}

History.propTypes = {
  uid: React.PropTypes.string.isRequired
}

History.contextTypes = {
  match: React.PropTypes.object.isRequired
}

export default History
