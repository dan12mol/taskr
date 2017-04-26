import React from 'react';

class AddNewProject extends React.Component {

  constructor() {
    super();

    this.addNewProject = this.addNewProject.bind(this);
  }

  addNewProject(event) {
    event.preventDefault();

    const project = {
      name: this.name.value,
      desc: this.desc.value
    }

    this.props.addNewProject(project);
    this.projectForm.reset();
  }

  render() {
    return (
      <form onSubmit={this.addNewProject} ref={(input) => this.projectForm = input }>
        <input type="text" placeholder="Project Name" ref={(input) => this.name = input } />
        <textarea placeholder="Project Description" ref={(input) => this.desc = input }></textarea>
        <button type="submit">+ Add</button>
      </form>
    )
  }
}

AddNewProject.propTypes = {
  addNewProject: React.PropTypes.func.isRequired
}

export default AddNewProject;
