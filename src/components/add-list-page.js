import React from "react";
import Header from "./header";
import Nav from "./nav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addNewList } from "../actions";

export class AddList extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let userId = this.props.user.id;
    const newList = {
      user: userId,
      name: this.name.value,
      description: this.description.value
    };
    this.props.dispatch(
      addNewList(newList, () => {
        this.props.history.push(`/lists/user/${userId}`);
      })
    );
  }

  render() {
    return (
      <div>
        <Header />
        <form id="add-list-form" onSubmit={this.onSubmit}>
          <legend>Create a list:</legend>
          <input
            type="text"
            placeholder="  Name"
            className="signup"
            ref={input => (this.name = input)}
            required
          />
          <input
            type="text"
            placeholder="  Description"
            className="signup"
            ref={input => (this.description = input)}
            required
          />
          <Link to="/lists/user/:id">
            <button>Back</button>
          </Link>
          <input type="submit" value="Save" />
        </form>
        <Nav />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AddList);
