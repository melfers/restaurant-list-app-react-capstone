import React from 'react';
import Header from './header';
import Nav from './nav';
import {connect} from 'react-redux';
import { pullRestaurantInfo } from '../actions';

import { Link } from 'react-router-dom';



export class IndividualRestaurant extends React.Component {
  componentDidMount(){
    let { restId } = this.props.match.params;
    console.log(restId);
    this.props.dispatch(pullRestaurantInfo(restId));
  };

  render() { 
    return (
      <div>
        <Header />
        <img src="images/back-arrow.png" className="back-button" alt=" " />
        <h2>{this.props.currentRestaurant.name}</h2>
        <div id="img-placeholder">
          <img src={this.props.currentRestaurant.featured_image} className="individual-restaurant-img" alt="featured-restaurant" />
        </div>
        <p>{this.props.currentRestaurant.location.address}</p>
        <p>{this.props.currentRestaurant.location.locality}</p>
        <p>{this.props.currentRestaurant.cuisines}</p>
        <h3>My Notes:</h3>
        <p>{this.props.restaurantUserNotes}</p>
        <Link to='lists/user/listname/:id/:restaurantId/edit'>
          <button>Edit</button>
        </Link>
        <Nav />
      </div>
    );
  }
};

export const mapStateToProps = state => ({
  currentRestaurant: state.currentRestaurant
});

export default connect(mapStateToProps)(IndividualRestaurant);