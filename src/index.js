import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import base from './base';

import './css/style.css';

import NotFound from './components/NotFound';
import App from './components/App';
import History from './components/History';
import Login from './components/Login';

class Root extends React.Component {

  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      uid: null
    };
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, {user});
      }
    });
  }

  authenticate(service) {
    base.authWithOAuthPopup(service, this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return;
    }

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
            uid={this.state.uid}
            />} />
          <Match pattern="/project/:projectId" render={() => <History
            uid={this.state.uid}
            />}/>
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    )
  }
}

render(<Root/>, document.querySelector('#root'));
