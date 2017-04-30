import React from 'react';

class Completed extends React.Component {
  render() {

    const item = this.props.completed[this.props.index];

    return (
      <div className="item">
        <button onClick={() => this.props.uncheckItem(this.props.index)}></button>
        <p>{item}</p>
        <a onClick={() => this.props.removeItem(this.props.index, 'completed')}>&times;</a>
      </div>
    )
  }
}

Completed.propTypes = {
  completed: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  uncheckItem: React.PropTypes.func.isRequired,
  removeItem: React.PropTypes.func.isRequired
}

export default Completed;
