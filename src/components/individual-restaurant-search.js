import React from 'react';
import Header from './header';
import Nav from './nav';

import {connect} from 'react-redux';

import { postUserNotes } from '../actions';

export class IndividualRestaurantSearch extends React.Component{
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const inputs = [this.listAdd, this.notes];
    const currentRestaurant = this.props.currentRestaurant;
    const userNotes = this.notes.value;
    const addToList = this.listAdd.value;

    this.props.dispatch(postUserNotes(currentRestaurant, userNotes, addToList));
    inputs.map(input => (input.value =""));
  }


  render() {
    let searchList = [];

    if(this.props.userLists.length > 0){
      searchList = this.props.userLists.map((list, index) => (
        <option 
          value={list.name} 
          key={index}
          >{list.name}</option>
      ));
    }

    return (
        <div>
          <Header />
          <img src="images/back-arrow.png" className="back-button" alt=" " />
          <h2>{this.props.currentRestaurant.name}</h2>
          <div id="img-placeholder">
            <img src={this.props.currentRestaurant.featured_image} className="individual-restaurant-img" alt="featured-restaurant" />
          </div>
          <p>{this.props.currentRestaurant.location.address}</p>
          <p>{this.props.currentRestaurant.location.locality}</p>
          <p>{this.props.currentRestaurant.cuisines}</p>
          <form onSubmit={this.onSubmit}>
            <div className="edit-restaurant-info">
                <label htmlFor="select">Add to list:</label>
                <select
                  ref={input => (this.listAdd = input)}
                >
                  {searchList}
                </select>
            </div>
            <input 
              type="submit" 
              value="Save" 
              className="save-button"
              />
          </form>
          <Nav />
        </div>
      );
  }
};

export default connect()(IndividualRestaurantSearch);