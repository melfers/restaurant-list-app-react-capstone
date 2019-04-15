import React from "react";

import { connect } from "react-redux";
import { signupUser } from "../actions";
import { Redirect, Link } from "react-router-dom";

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const inputs = [this.name, this.email, this.password, this.password2];
    const user = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };
    this.props.dispatch(
      signupUser(user, userID => {
        console.log("callback success");
        this.props.history.push("/auth/login");
      })
    );

    console.log("signup user action dispatched");
    inputs.map(input => (input.value = ""));
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/auth/login" />;
    }
    return (
      <section id="signupPage">
        <div id="login-header">
          <h1 className="second-header">N </h1>
          <img
            src={require("../images/donut.png")}
            className="sub-donut"
            alt=" "
          />
          <h1 className="second-header"> M</h1>
        </div>
        <h2>Sign Up</h2>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              ref={input => (this.name = input)}
              className="signup"
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              ref={input => (this.email = input)}
              className="signup"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={input => (this.password = input)}
              className="signup"
              required
            />
            <label htmlFor="reEnterPassword">Re-Enter Password</label>
            <input
              type="password"
              ref={input => (this.password2 = input)}
              className="signup"
              required
            />
            <div>
              <button>
                <Link to="/">Back</Link>
              </button>
              <input type="submit" />
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
