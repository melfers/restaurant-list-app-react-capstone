import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getLists } from "../actions/index";

export class Nav extends React.Component {
  getAllLists() {
    this.props.dispatch(getLists(this.props.user.id));
  }

  render() {
    return (
      <div>
        <nav role="navigation" id="bottom-nav">
          <ul id="main-nav">
            <li>
              <Link to="/user">
                <img src={require("../images/user.png")} alt=" " />
                <p className="navText">Profile</p>
              </Link>
            </li>
            <li>
              <Link to="/search">
                <img src={require("../images/magnifier.png")} alt=" " />
                <p className="navText">Search</p>
              </Link>
            </li>
            <li>
              <Link to={`/lists/user/${this.props.user.id}`}>
                <img src={require("../images/list.png")} alt=" " />
                <p className="navText">Lists</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Nav);
