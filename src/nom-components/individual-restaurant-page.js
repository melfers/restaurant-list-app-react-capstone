import React from 'react';

import {connect} from 'react-redux';

export function IndividualRestaurant() {
    return (
        <img src="images/back-arrow.png" class="back-button">
        <h2>Bob's Donuts</h2>
        <div id="img-placeholder">
          <img src="images/stock-donut.jpg" class="individual-restaurant-img">
        </div>
          <p>1822 South Van Ness Ave.</p>
          <p>415-960-3293</p>
          <p>Hours:</p>
          <form>
            <div class="edit-restaurant-info">
                <label for="select">Add to list:</label>
                <select>
                  <option value="visited">Visited</option>
                  <option value="toVisit">To Visit</option>
                </select>
            </div>
            <div class="edit-restaurant-info">
                <label for="rating">Rating:</label>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            <textarea placeholder="  Notes" class="edit-restaurant-info"></textarea>
            <input type="submit" value="Save" class="save-button">
          </form>
    );
}

export default connect()(IndividualRestaurant);