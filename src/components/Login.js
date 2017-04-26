import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.authenticate('facebook')}>Log In With Facebook</button>
    )
  }
}

Login.propTypes = {
  authenticate: React.PropTypes.func.isRequired
}

export default Login;
