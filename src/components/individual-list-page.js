import React from 'react';

import {connect} from 'react-redux';

export class IndividualList extends React.Component {
    render() {
        if (this.props.loading) {
          return (
            <div className="spinner-container">
              <Spinner className="spinner" name="circle" />
            </div>
          );
    }

    let restaurants = [];

    // for rendering individual list of restaurants
    if (this.props.restaurants.length > 0) {
        restaurants = this.props.restaurants.map((restaurant, index) => (
                <li className="restaurant-card" key={index}>
                    <img src={restaurant.thumb} alt="thumbnail-image" />
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.cuisines}</p>
                </li>
            ));
    return (
        <div>
            <Header />
            <h2>{list.title}</h2>
            <ul className="list">
                {restaurants}
            </ul>
            <Nav />
        </div>
    );
}

export const mapStateToProps = state => ({
    restaurants: state.restaurants,
    loading: state.loading,
    authToken: state.authToken
});
  
export default connect(mapStateToProps)(IndividualList);