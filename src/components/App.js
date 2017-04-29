import React from 'react';

import Dashboard from './Dashboard';

class App extends React.Component {

  constructor() {
    super();

    this.goToProject = this.goToProject.bind(this);
  }

  goToProject(key) {
    this.context.router.transitionTo(`/project/${key}`);
  }
  
  render() {
    return (
      <div className="App">
        <button className="add-new-project-btn b-w-btn" onClick={this.props.showAddNewProject}>+ Add New Project</button>
        <Dashboard
        addNewProject={this.props.addNewProject}
        showAddNewProject={this.props.showAddNewProject}
        closeAddNewProjectModal={this.props.closeAddNewProjectModal}
        projects={this.props.projects}
        removeProject={this.props.removeProject}
        goToProject={this.goToProject}
        />
      </div>
    )
  }

}

App.propTypes = {
  showAddNewProject: React.PropTypes.bool.isRequired,
  addNewProject: React.PropTypes.func.isRequired,
  closeAddNewProjectModal: React.PropTypes.func.isRequired,
  projects: React.PropTypes.object.isRequired,
  removeProject: React.PropTypes.func.isRequired,
}

App.contextTypes = {
  router: React.PropTypes.object
}

export default App;

