import React from 'react';

class AddItem extends React.Component {

  constructor() {
    super();

    this.addItem = this.addItem.bind(this);
  }

  addItem(event) {

    event.preventDefault();

    this.props.addItem(this.newItem.value);

    this.newItemForm.reset();
  }

  render() {
    return (
      <form ref={(input) => this.newItemForm = input} onSubmit={this.addItem}>
        <input ref={(input) => this.newItem = input} type="text" placeholder="New Item" />
      </form>
    )
  }


}

AddItem.propTypes = {
  addItem: React.PropTypes.func.isRequired
}

export default AddItem
