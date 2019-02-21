import React from 'react';

import {connect} from 'react-redux';

export function AllLists(prop) {
    return (
        <div>
            <ul class="lists">
            <li class="restaurant-card">
                <img src="images/stock-donut.jpg" />
                <h2>To Visit</h2>
                <p>Places on my bucket list</p>
            </li>
            </ul>
        </div>
    );
}

export default connect()(AllLists);