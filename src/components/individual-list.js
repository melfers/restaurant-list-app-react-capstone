import React from 'react';
import Header from './header';
import Nav from './nav';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { displayListRestaurant } from '../actions';

export class IndividualList extends React.Component {  
    showRestaurantInfo(target) {
        this.props.dispatch(displayListRestaurant(target.id));
    }

    render() {
        if (this.props.error) {
            return <div className="unauthorized">{this.props.error}</div>;
        }

        let restaurantArray = [];

        if(this.props.currentList.length > 0){
            restaurantArray = this.props.currentList.restaurants.map((restaurant, index) => (
                <Link >
                    <li class="restaurant-card"
                        onClick={(e => this.showRestaurantInfo(e.currentTarget))}
                    >
                        <img src={restaurant.featured_image} />
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.cuisines}</p>
                    </li>
                </Link>
            ));
        }
    
        return (
        <div>
            <Header />
            <section className="lists">
            <h2>{this.props.currentList.name}</h2>
            {restaurantArray}
            </section>
            <Nav />
        </div>
        );
    }
}

export const mapStateToProps = state => ({
    currentList: state.currentList,
    error: state.error
});

export default connect(mapStateToProps)(IndividualList);