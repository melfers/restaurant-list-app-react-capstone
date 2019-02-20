import React from 'react';

import {connect} from 'react-redux';

export function SearchPage() {
    return (
        <label for="search">Search:</label>
        <input type="text">
        <ul class="lists">
          <li class="restaurant-card">
              <img src="images/stock-donut.jpg">
              <h2>Bob's Donuts</h2>
              <p>Breakfast  |  Rating: 4.5</p>
          </li>
          <li>Restaurant 2</li>
          <li>Restaurant 3</li>
          <li>Restaurant 4</li>
          <li>Restaurant 5</li>
        </ul>
    );
}

export default connect()(SearchPage);