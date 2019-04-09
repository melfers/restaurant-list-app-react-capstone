import React from 'react';
import Header from './header';
import Nav from './nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRestaurantInfoList } from '../actions';

export class IndividualRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    let { restaurantId } = this.props.match.params;
    console.log(restaurantId);
    this.props.dispatch(getRestaurantInfoList(restaurantId));
  };

  render() { 
    let finalImage = (this.props.currentRestaurant.featured_image !== '') ? this.props.currentRestaurant.featured_image : require('../images/stock-donut.jpg');
    return (
      <div>
        <Header />
        <img src="images/back-arrow.png" className="back-button" alt=" " />
        <h2>{this.props.currentRestaurant.name}</h2>
        <div id="img-placeholder">
          <img src={finalImage} className="individual-restaurant-img" alt="featured-restaurant" />
        </div>
        <p>Placeholder Address{/*{this.props.currentRestaurant.location.address}*/}</p>
        <p>Placeholder Neighborhood{/*{this.props.currentRestaurant.location.locality}*/}</p>
        <p>{this.props.currentRestaurant.cuisines}</p>
        <h3>My Notes:</h3>
        <p>{this.props.currentRestaurant.userNotes}</p>
        <Link to={`/singleList/${this.props.currentRestaurant.listId}`}>
          <button>Back</button>
        </Link>
          <button>Delete</button>
        <Nav />
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  currentRestaurant: state.currentRestaurant
});

export default connect(mapStateToProps)(IndividualRestaurant);