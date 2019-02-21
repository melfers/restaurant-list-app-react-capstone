import React from 'react';

import {connect} from 'react-redux';

export function AllLists(prop) {
    return (
        <div>
            <ul className="lists">
            <li className="restaurant-card">
                <img src="images/stock-donut.jpg" alt=" " />
                <h2>To Visit</h2>
                <p>Places on my bucket list</p>
            </li>
            </ul>
        </div>
    );
}

export default connect()(AllLists);