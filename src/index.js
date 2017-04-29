import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import base from './base';

import './css/style.css';

import NotFound from './components/NotFound';
import App from './components/App';
import TodoList from './components/TodoList';
import Login from './components/Login';

class Root extends React.Component {

  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    this.showAddNewProject = this.showAddNewProject.bind(this);
    this.closeAddNewProjectModal = this.closeAddNewProjectModal.bind(this);
    this.removeProject = this.removeProject.bind(this);

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

    if (!this.state.uid) {
      return (
        <div>
          <Login authenticate={this.authenticate} />
        </div>
      )
    }

    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" render={() => <App
            showAddNewProject={this.state.showAddNewProject}
            addNewProject={this.addNewProject}
            closeAddNewProjectModal={this.closeAddNewProjectModal}
            projects={this.state.projects}
            removeProject={this.removeProject}
            />} />
          <Match pattern="/project/:projectId" render={() => <TodoList />}/>
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    )
  }
}

render(<Root/>, document.querySelector('#root'));
