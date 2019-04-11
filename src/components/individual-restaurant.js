import React from 'react';
import Header from './header';
import Nav from './nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRestaurantInfoList, deleteRestaurantFromList } from '../actions';

export class IndividualRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    let { restaurantId } = this.props.match.params;
    this.props.dispatch(getRestaurantInfoList(restaurantId));
  };

  deleteSelectedRestaurant(){
    let listId = this.props.currentRestaurant.listId;
    let { restaurantId } = this.props.match.params;
    this.props.dispatch(deleteRestaurantFromList(restaurantId, ()=>{
      this.props.history.push(`/singleList/${listId}`);
    }));
  }

  render() { 
    let finalImage = (this.props.currentRestaurant.featured_image !== '') ? this.props.currentRestaurant.featured_image : require('../images/stock-donut.jpg');
    return (
      <div>
        <Header />
        <section className="single-restaurant">
          <h2>{this.props.currentRestaurant.name}</h2>
          <div id="img-placeholder">
            <img src={finalImage} className="individual-restaurant-img" alt="featured-restaurant" />
          </div>
          <p>{(this.props.currentRestaurant.location!== undefined) ? this.props.currentRestaurant.location.address : ''}</p>
          <p>{(this.props.currentRestaurant.location!== undefined) ? this.props.currentRestaurant.location.locality : ''}</p>
          <p className="cuisines">{this.props.currentRestaurant.cuisines}</p>
          <Link to={`/singleList/${this.props.currentRestaurant.listId}`}>
            <button>Back</button>
          </Link>
            <button
              onClick={(e => this.deleteSelectedRestaurant())}
              >Delete</button>
        </section>
        <Nav />
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  currentRestaurant: state.currentRestaurant
});

export default connect(mapStateToProps)(IndividualRestaurant);