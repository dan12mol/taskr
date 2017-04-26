import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <h1>Welcome</h1>
        <button className="btn facebook-btn" onClick={() => this.props.authenticate('facebook')}>Log In With Facebook</button>
        <button className="btn github-btn" onClick={() => this.props.authenticate('github')}>Log In With Github</button>
      </div>
    )
  }
}

Login.propTypes = {
  authenticate: React.PropTypes.func.isRequired
}

export default Login;
