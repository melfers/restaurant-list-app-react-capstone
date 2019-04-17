import React from "react";
import { connect } from "react-redux";
import { getUserLists } from "../actions";

import { Link } from "react-router-dom";

export class Lists extends React.Component {
  componentDidMount() {
    let userId = this.props.user.id;
    this.props.dispatch(getUserLists(userId));
  }

  render() {
    let listArray = [];

    // for rendering all lists
    if (this.props && this.props.userLists && this.props.userLists.length > 0) {
      listArray = this.props.userLists.map((list, index) => (
        <li className="restaurant-card" key={index} id={list._id}>
          <Link to={`/singleList/${list._id}`}>
            <h2>{list.name}</h2>
            <p>{list.description}</p>
          </Link>
        </li>
      ));
    } else {
      listArray = "";
    }

    return (
      <div>
        {this.props.userLists.length ? (
          <ul className="list">{listArray}</ul>
        ) : (
          <p>
            Start by creating a list to add restaurants to by clicking the
            button below.
          </p>
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  authToken: state.authToken,
  loading: state.loading,
  userLists: state.userLists
});

export default connect(mapStateToProps)(Lists);
