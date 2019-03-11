import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";

import { pullRestaurantInfo } from "../actions";
  
export class SearchResults extends React.Component { 

    displayRestaurantInfo(target) {
        let selectedRestaurant = this.props.restaurants.find(
            restaurant => restaurant.id === target.id
        );
        
        this.props.dispatch(pullRestaurantInfo(selectedRestaurant));
    }

    render(){  
        if (this.props.loading) {
            let spinnerIcon = (
                <div className="spinner-container">
                <Spinner className="spinner" name="circle" />
                </div>
            );
            return (
            {spinnerIcon}
            );
    }
        let resultsList = [];

        // for rendering search list
        if (this.props.restaurants.length > 0) {
            resultsList = this.props.searchResults.map((restaurant, index) => (
                    <li 
                        className="restaurant-card"
                        id={restaurant.id}
                        key={index}
                        onClick={e => this.displayRestaurantInfo(e.currentTarget)}
                    >
                        <img src={restaurant.thumb} alt="thumbnail" />
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.cuisines}</p>
                    </li>
            ));
            return (
                <div>
                    <h2>{this.props.currentList.title}</h2>
                    <ul className="list">
                        {resultsList}
                    </ul>
                </div>
            );
        }
    }
}

export const mapStateToProps = state => ({
    searchResults: state.searchResults,
    loading: state.loading,
    currentRestaurant: state.currentRestaurant
});
  
export default connect(mapStateToProps)(SearchResults);