import React from 'react';

import { connect } from 'react-redux';
import { signupUser } from '../actions';
import { Redirect } from 'react-router-dom';

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const inputs = [this.name, this.email, this.password];
    const user = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };
    this.props.dispatch(signupUser(user));
    inputs.map(input => (input.value =""));
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/lists/user/:id" />;
    }
    return (
      <section id="signupPage">
        <h2>Sign Up</h2>
        <span className="error">{this.props.error}</span>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <label htmlFor="name">Name:</label>
            <input
              type="text" 
              ref={input => (this.name = input)}
              required 
            />
            <label htmlFor="email">Email:</label>
            <input
            type="email" 
            ref={input => (this.email = input)}
            required 
            />
            <label htmlFor="password">Password</label>
            <input
              type="password" 
              ref={input => (this.password = input)}
              required 
            />
            <label htmlFor="reEnterPassword">Re-Enter Password</label>
            <input 
              type="password"
              ref={input => (this.password2 = input)}
              required
            />
            <div>
              <button>Back</button>
              <input 
                type="submit"
               />
            </div>
          </fieldset>
        </form>
      </section>
    );
  }
}

export const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
  loggedIn: state.user
});

export default connect(mapStateToProps)(SignupPage);