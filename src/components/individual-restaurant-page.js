import React from 'react';

import {connect} from 'react-redux';

export function IndividualRestaurant() {
    return (
      <div>
        <img src="images/back-arrow.png" className="back-button" alt=" " />
        <h2>Bob's Donuts</h2>
        <div id="img-placeholder">
          <img src="images/stock-donut.jpg" className="individual-restaurant-img" alt=" " />
        </div>
          <p>1822 South Van Ness Ave.</p>
          <p>415-960-3293</p>
          <p>Hours:</p>
          <form>
            <div className="edit-restaurant-info">
                <label htmlFor="select">Add to list:</label>
                <select>
                  <option value="visited">Visited</option>
                  <option value="toVisit">To Visit</option>
                </select>
            </div>
            <div className="edit-restaurant-info">
                <label htmlFor="rating">Rating:</label>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            <textarea placeholder="  Notes" className="edit-restaurant-info"></textarea>
            <input type="submit" value="Save" className="save-button" />
          </form>
        </div>
    );
}

export default connect()(IndividualRestaurant);