import React from 'react';

import { connect } from 'react-redux';
import { login } from '../actions';
import { Redirect } from 'react-router-dom';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const inputs = [this.email, this.password];
    const user = {
      email: this.email.value,
      password: this.password.value
    };
    this.props.dispatch(login(user));
    inputs.map(input => (input.value=""));
  }

  render() {
    /*if (this.props.loggedIn) {
      return <Redirect to="/lists/user" />
    }*/

    return (
      <section id="login-page">
        <div id="login-header">
          <h1 className="second-header">N  </h1>
          <img src="/images/donut.png" className="sub-donut" alt=" " />
          <h1 className="second-header">  M</h1>
        </div>
        <h2>Log In</h2>
        <span className="error">{this.props.error}</span>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <div>
              <label htmlFor="email">Email:</label>
              <input 
                type="email"
                className="loginForm"
                ref={input => (this.email = input)}
                className="signup"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input 
                type="password"
                className="loginForm"
                ref={input => (this.password = input)}
                className="signup"
                required
              />
            </div>
          </fieldset>
          <input type="submit" />
        </form>
      </section>
    );
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.user,
  error: state.error,
  user: state.user
});

export default connect (mapStateToProps)(LoginPage);