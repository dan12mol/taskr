import React from 'react';
import base from '../base';

import Login from './Login';
import Dashboard from './Dashboard';

class App extends React.Component {
  
  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    this.showAddNewProject = this.showAddNewProject.bind(this);
    this.closeAddNewProjectModal = this.closeAddNewProjectModal.bind(this);

    this.state = {
      uid: null,
      projects: {},
      showAddNewProject: false
    };
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, {user});
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  authenticate(service) {
    base.authWithOAuthPopup(service, this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return;
    }

    this.ref = base.syncState(`users/${authData.user.uid}/projects`, {
      context: this,
      state: 'projects'
    });

    this.setState({
      uid: authData.user.uid,
    });

  }

  logOut() {
    base.unauth();
    this.setState({
      uid: null
    });
  }

  addNewProject(project) {
    const projects = {...this.state.projects};

    const timestamp = Date.now();
    projects[`project-${timestamp}`] = project;
    
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

    if (!this.state.uid) {
      return (
        <div>
          <Login authenticate={this.authenticate} />
        </div>
      )
    }

    return (
      <div className="App">
        <button className="add-new-project-btn b-w-btn" onClick={this.showAddNewProject}>+ Add New Project</button>
        <Dashboard addNewProject={this.addNewProject} showAddNewProject={this.state.showAddNewProject} closeAddNewProjectModal={this.closeAddNewProjectModal} projects={this.state.projects} />
      </div>
    )
  }

}

export default App;

