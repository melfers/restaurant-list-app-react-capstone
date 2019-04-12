import React from "react";
import Header from "./header";
import Nav from "./nav";
import { connect } from "react-redux";

export class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <img src={require("../images/user.png")} id="profile-img" alt=" " />
        </div>
        <h2>Hi {this.props.user.name}!</h2>
        <button>Log Out</button>
        <Nav />
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  user: state.user
});

export default connect(mapStateToProps)(ProfilePage);
