import React from "react";
import Header from "./header";
import Nav from "./nav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  getUserLists,
  addRestaurantToList,
  pullRestaurantInfo
} from "../actions";

export class IndividualRestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    let userId = this.props.user.id;
    this.props.dispatch(getUserLists(userId));
    let { id } = this.props.match.params;
    this.props.dispatch(pullRestaurantInfo(id));
  }

  onSubmit(e) {
    e.preventDefault();
    const currentRestaurant = this.props.currentRestaurant;
    const listName = document
      .querySelector(`option[value="${this.listAdd.value}"]`)
      .getAttribute("name");
    const userNotes = "";
    const selectedList = this.listAdd.value;

    this.props.dispatch(
      addRestaurantToList(
        selectedList,
        currentRestaurant,
        userNotes,
        listName,
        () => {
          this.props.history.push(`/singleList/${selectedList}`);
        }
      )
    );
  }

  render() {
    let searchList = [];
    if (this.props.userLists !== undefined && this.props.userLists.length > 0) {
      searchList = this.props.userLists.map((list, index) => (
        <option value={list._id} key={index} name={list.name}>
          {list.name}
        </option>
      ));
    }
    let finalImage =
      this.props.currentRestaurant.featured_image !== ""
        ? this.props.currentRestaurant.featured_image
        : require("../images/stock-donut.jpg");
    return this.props.currentRestaurant.location !== undefined ? (
      <div>
        <Header />
        <section className="single-restaurant">
          <h2>{this.props.currentRestaurant.name}</h2>
          <div id="img-placeholder">
            <img
              src={finalImage}
              className="individual-restaurant-img"
              alt="featured-restaurant"
            />
          </div>
          <p>{this.props.currentRestaurant.location.address}</p>
          <p>{this.props.currentRestaurant.location.locality}</p>
          <p className="cuisines">{this.props.currentRestaurant.cuisines}</p>
          {this.props.user != "" ? (
            <form onSubmit={e => this.onSubmit(e)}>
              <div className="edit-restaurant-info">
                <label htmlFor="select" className="addListLabel">
                  Add to list:
                </label>
                <select
                  className="select-list"
                  ref={input => (this.listAdd = input)}
                >
                  {searchList}
                </select>
              </div>
              <div>
                <button>
                  <Link to="/search">Back</Link>
                </button>
                <input type="submit" value="Save" id="save-search" />
              </div>
            </form>
          ) : (
            <Link to="/auth/login">
              <button className="save-button">Log In to Save</button>
            </Link>
          )}
        </section>
        <Nav />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  currentRestaurant: state.currentRestaurant,
  userLists: state.userLists,
  user: state.user
});

export default connect(mapStateToProps)(IndividualRestaurantSearch);
