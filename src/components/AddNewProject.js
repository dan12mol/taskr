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
    this.props.closeAddNewProjectModal();
  }

  render() {
    return (
      <div className="AddNewProject">
        <div className="overlay"></div>
        <div className="modal-container">
          <button className="close-btn" onClick={this.props.closeAddNewProjectModal}>
            <img src="img/close-btn.png" alt="" />
          </button>
          <div className="modal">
            <div className="form-container">
              <form onSubmit={this.addNewProject} ref={(input) => this.projectForm = input }>
                <h2>Create a New Project</h2>
                <input className="name-input" type="text" placeholder="Project Name" ref={(input) => this.name = input } />
                <input className="desc-input" type="text" placeholder="Project Description" ref={(input) => this.desc = input } />
                <button className="b-w-btn" type="submit">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddNewProject.propTypes = {
  addNewProject: React.PropTypes.func.isRequired,
  closeAddNewProjectModal: React.PropTypes.func.isRequired
}

export default AddNewProject;
