import React from 'react';

import AddNewProject from './AddNewProject';
import Project from './Project';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="projects-container">
          {
            Object.keys(this.props.projects)
              .map(key => <Project key={key} projects={this.props.projects} index={key} />)
          }
        </div>
        <AddNewProject addNewProject={this.props.addNewProject} />
      </div>
    )
  }
}

Dashboard.propTypes = {
  addNewProject: React.PropTypes.func.isRequired,
  projects: React.PropTypes.object.isRequired
}

export default Dashboard
