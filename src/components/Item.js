import React from 'react';

class Item extends React.Component {
  render() {

    const item = this.props.items[this.props.index];

    return (
      <div className="item">
        <button onClick={() => this.props.checkItem(this.props.index)}></button>
        <p>{item}</p>
      </div>
    )
  }
}

Item.propTypes = {
  items: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  checkItem: React.PropTypes.func.isRequired
}

export default Item;
