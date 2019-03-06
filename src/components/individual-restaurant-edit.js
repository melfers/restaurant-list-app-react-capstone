import React from 'react';

import {connect} from 'react-redux';

export class IndividualRestaurantEdit extends React.component{
  onSubmit(e) {
    e.preventDefault();
    const inputs = [this.notes];
    const currentRestaurant = this.props.currentRestaurant;
    const userNotes = this.notes.value;

    this.props.dispatch(postUserNotes(currentRestaurant, userNotes));
    inputs.map(input => (input.value =""));
  }

  onClick(e) {
    e.preventDefault();
    this.props.dispatch(deleteRestaurant(currentRestaurant));
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
          <h2>{this.props.currentRestaurant.name}</h2>
          <div id="img-placeholder">
            <img src={this.props.currentRestaurant.featured_image} className="individual-restaurant-img" alt="featured-restaurant-image" />
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

export default connect()(IndividualRestaurantEdit);