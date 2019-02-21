import React from 'react';

import {connect} from 'react-redux';

export function SearchPage() {
    return (
        <div>
            <label htmlFor="search">Search:</label>
            <input type="text" />
            <ul className="lists">
            <li className="restaurant-card">
                <img src="images/stock-donut.jpg" alt=" " />
                <h2>Bob's Donuts</h2>
                <p>Breakfast  |  Rating: 4.5</p>
            </li>
            <li>Restaurant 2</li>
            <li>Restaurant 3</li>
            <li>Restaurant 4</li>
            <li>Restaurant 5</li>
            </ul>
        </div>
    );
}

export default connect()(SearchPage);