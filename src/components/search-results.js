import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { pullRestaurantInfo } from "../actions";
  
export class SearchResults extends React.Component { 

    displayRestaurantInfo(target) {
        let selectedRestaurant = target.id;
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
        
        // for rendering search list
        let resultsList = [];
        if (this.props.searchResults.length > 0) {
            resultsList = this.props.searchResults.map((item, index) => (
                <Link to="/singleRestaurant/:id">
                    <li 
                        className="restaurant-card"
                        id={item.restaurant.id}
                        key={index}
                        onClick={e => this.displayRestaurantInfo(e.currentTarget)}
                    >
                        <img src={item.restaurant.thumb} alt="thumbnail" />
                        <h2>{item.restaurant.name}</h2>
                        <p>{item.restaurant.cuisines}</p>
                    </li>
                </Link>
            ))
        }
        return (
            <div>
                <ul className="lists">
                    {resultsList}
                </ul>
            </div>
        )
    };
}

export const mapStateToProps = state => ({
    searchResults: state.searchResults,
    loading: state.loading,
    currentRestaurant: state.currentRestaurant
});
  
export default connect(mapStateToProps)(SearchResults);