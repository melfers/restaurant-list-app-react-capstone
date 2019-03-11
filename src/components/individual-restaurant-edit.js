import React from 'react';
import Header from './header';
import Nav from './nav';

import {connect} from 'react-redux';

import { deleteRestaurantFromList, postUserNotes } from '../actions';

export class IndividualRestaurantEdit extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    const inputs = this.notes;
    const currentRestaurant = this.props.currentRestaurant;
    const userNotes = this.notes.value;

    this.props.dispatch(postUserNotes(currentRestaurant, userNotes));
    inputs.map(input => (input.value =""));
  }

  onClick(e) {
    e.preventDefault();
    const currentRestaurant = this.props.currentRestaurant;
    this.props.dispatch(deleteRestaurantFromList(currentRestaurant));
  }

  render() {
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
              <textarea 
                ref={input => (this.notes = input)}
                placeholder="  Notes" 
                class="edit-restaurant-info"></textarea>
            </div>
            <input 
              type="submit" 
              value="Save" 
              className="save-button"
            />
            <button onClick={this.onclick}>Remove</button>
          </form>
          <Nav />
        </div>
      );
  }
};

export const mapStateToProps = state => ({
  currentRestaurant: state.currentRestaurant,
  error: state.error
});

export default connect()(IndividualRestaurantEdit);