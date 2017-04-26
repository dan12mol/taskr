import React from 'react';

class Project extends React.Component {
  render() {

    const project = this.props.projects[this.props.index];

    return (
      <div className="Project">
        <div className="remove-btn" onClick={() => this.props.removeProject(this.props.index)}>
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
  removeProject: React.PropTypes.func.isRequired
}

export default Project
