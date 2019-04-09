import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";

import { Link } from 'react-router-dom';

  
export class SearchResults extends React.Component { 
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
            resultsList = this.props.searchResults.map((item, index) => {
                let finalImage = (item.restaurant.thumb !== '') ? item.restaurant.thumb : require('../images/stock-donut.jpg');
                return(
                    <Link to={`/singleRestaurant/${item.restaurant.id}`}>
                        <li 
                            className="restaurant-card"
                            id={item.restaurant.id}
                            key={index}
                        >
                            <img src={finalImage} alt="thumbnail" className="thumbImg" />
                            <div className="rest-info">
                                <h2>{item.restaurant.name}</h2>
                                <p className="locality">{item.restaurant.location.locality}</p>
                                <p>{item.restaurant.cuisines}</p>
                            </div>
                        </li>
                    </Link>
                )
            })
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