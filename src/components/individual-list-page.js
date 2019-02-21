import React from 'react';

import {connect} from 'react-redux';

export function IndividualList() {
    return (
        <div>
            <h2>Best Donut Shops</h2>
            <ul className="lists">
                <li className="restaurant-card">
                    <img src="images/stock-donut.jpg" alt=" " />
                    <h2>Bob's Donuts</h2>
                    <p>Breakfast  |  Rating: 4.5</p>
                </li>
                <li className="restaurant-card">Restaurant 2</li>
                <li className="restaurant-card">Restaurant 3</li>
                <li className="restaurant-card">Restaurant 4</li>
                <li className="restaurant-card">Restaurant 5</li>
            </ul>
        </div>
    );
}

export default connect()(IndividualList);