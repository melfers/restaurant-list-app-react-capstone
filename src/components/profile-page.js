import React from "react";
import Header from "./header";
import Nav from "./nav";
import { connect } from "react-redux";
import { logOut } from "../actions";

export class ProfilePage extends React.Component {
  logOut() {
    this.props.dispatch(
      logOut(() => {
        this.props.history.push(`/`);
      })
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <img src={require("../images/user.png")} id="profile-img" alt=" " />
        </div>
        <h2>Hi {this.props.user.name}!</h2>
        <button onClick={e => this.logOut()}>Log Out</button>
        <Nav />
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  user: state.user
});

export default connect(mapStateToProps)(ProfilePage);
