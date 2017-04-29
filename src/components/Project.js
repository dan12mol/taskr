import React from 'react';

class Project extends React.Component {

  constructor() {
    super();

    this.removeProject = this.removeProject.bind(this);
  }

  removeProject(event) {
    event.preventDefault();

    this.props.removeProject(this.props.index);
  }

  render() {

    const project = this.props.projects[this.props.index];

    return (
      <div className="Project" onClick={() => this.props.goToProject(this.props.index)}>
        <div className="remove-btn" onClick={this.removeProject}>
          <img src="img/close-btn.png" alt="" />
        </div>
        <h2 className="project-name">{project.name}</h2>
        <p className="project-desc">{project.desc}</p>
      </div>
    )
  }
}

Project.propTypes = {
  projects: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  removeProject: React.PropTypes.func.isRequired,
  goToProject: React.PropTypes.func.isRequired
}

export default Project
