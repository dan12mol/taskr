import React from 'react';

import base from '../base';

class App extends React.Component {
  
  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);

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
      uid: authData.user.uid
    });
  }

  render() {
    return (
        <button onClick={() => this.authenticate('facebook')}>Log In With Facebook</button>
    )
  }

}

export default App;

