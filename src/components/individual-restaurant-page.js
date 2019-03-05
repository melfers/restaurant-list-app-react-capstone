//Convert to stateful

import React from 'react';

import {connect} from 'react-redux';

export class IndividualRestaurant extends React.component{
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
    if(this.props.userLists.length > 0){
      listArray = this.props.userLists.map((list, index) => (
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
          <h2>{restaurant.name}</h2>
          <div id="img-placeholder">
            <img src={restaurant.featured_image} className="individual-restaurant-img" alt="featured-restaurant-image" />
          </div>
          <p>{restaurant.location.address}</p>
          <p>{restaurant.location.locality}</p>
          <p>{restaurant.cuisines}</p>
          <form onSubmit={this.onSubmit}>
            <div className="edit-restaurant-info">
                <label htmlFor="select">Add to list:</label>
                <select>
                  {listArray}
                </select>
            </div>
            <textarea 
              placeholder="  Notes" 
              className="edit-restaurant-info"
              ref={input => (this.notes = input)}
              ></textarea>
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

export default connect()(IndividualRestaurant);