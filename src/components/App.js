import React from 'react';
import base from '../base';

import Dashboard from './Dashboard';

class App extends React.Component {

  constructor() {
    super();

    this.goToProject = this.goToProject.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    this.showAddNewProject = this.showAddNewProject.bind(this);
    this.closeAddNewProjectModal = this.closeAddNewProjectModal.bind(this);

    this.state = {
      projects: {},
      showAddNewProject: false
    };
  }

  componentDidMount() {
    this.ref = base.syncState(`users/${this.props.uid}/projects`, {
      context: this,
      state: 'projects'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  goToProject(key) {
    this.context.router.transitionTo(`/project/${key}`);
  }

  addNewProject(project) {
    const projects = {...this.state.projects};

    const timestamp = Date.now();
    projects[`project-${timestamp}`] = project;
    
    this.setState({ projects });
  }
  
  removeProject(key) {

    // TODO: Add a warning here before actually removing the project
    const projects = {...this.state.projects};

    projects[key] = null;
    
    this.setState({ projects });
  }

  showAddNewProject() {
    this.setState({
      showAddNewProject: true
    });
  }

  closeAddNewProjectModal() {
    this.setState({
      showAddNewProject: false
    });
  }
  
  
  render() {
    return (
      <div className="App">
        <button className="add-new-project-btn b-w-btn" onClick={this.showAddNewProject}>+ Add New Project</button>
        <Dashboard
        addNewProject={this.addNewProject}
        showAddNewProject={this.state.showAddNewProject}
        closeAddNewProjectModal={this.closeAddNewProjectModal}
        projects={this.state.projects}
        removeProject={this.removeProject}
        goToProject={this.goToProject}
        />
      </div>
    )
  }

}

App.propTypes = {
  uid: React.PropTypes.string.isRequired
}

App.contextTypes = {
  router: React.PropTypes.object
}

export default App;

