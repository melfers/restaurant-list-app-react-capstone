//Convert to stateful

import React from 'react';

import {connect} from 'react-redux';

export default function IndividualRestaurant(props){
    
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
          <form>
            <div className="edit-restaurant-info">
                <label htmlFor="select">Add to list:</label>
                <select>
                  <option value="visited">Visited</option>
                  <option value="toVisit">To Visit</option>
                </select>
            </div>
            <textarea placeholder="  Notes" className="edit-restaurant-info"></textarea>
            <input type="submit" value="Save" className="save-button" />
          </form>
          <Nav />
      </div>
    );
}

export default connect()(IndividualRestaurant);