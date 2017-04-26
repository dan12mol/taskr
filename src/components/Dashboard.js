import React from 'react';

import Project from './Project';
import AddNewProject from './AddNewProject';

class Dashboard extends React.Component {
  
  constructor() {
    super();

    this.renderAddNewProject = this.renderAddNewProject.bind(this);
  }

  renderAddNewProject() {
    return (
      <AddNewProject addNewProject={this.props.addNewProject} closeAddNewProjectModal={this.props.closeAddNewProjectModal} />
    )
  }

  render() {
    return (
      <div className="Dashboard">
        { this.props.showAddNewProject ? this.renderAddNewProject() : '' }
        <div className="projects-container">
          {
            Object.keys(this.props.projects)
              .map(key => <Project key={key} projects={this.props.projects} index={key} />)
          }
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  addNewProject: React.PropTypes.func.isRequired,
  projects: React.PropTypes.object.isRequired,
  showAddNewProject: React.PropTypes.bool.isRequired,
  closeAddNewProjectModal: React.PropTypes.func.isRequired
}

export default Dashboard
