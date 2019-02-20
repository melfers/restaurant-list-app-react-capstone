import React from 'react';

import {connect} from 'react-redux';

export function MainHeader(prop) {
    return (
        <ul class="lists">
          <li class="restaurant-card">
              <img src="images/stock-donut.jpg">
              <h2>To Visit</h2>
              <p>Places on my bucket list</p>
          </li>
        </ul>
    );
}

export default connect()(MainHeader);