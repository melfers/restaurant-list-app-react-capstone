import React from 'react';
import Header from './header';
import Nav from './nav';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import { getUserLists, addRestaurantToList, pullRestaurantInfo } from '../actions';

export class IndividualRestaurantSearch extends React.Component{
  /*constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }*/

  componentDidMount(){
    let userId = this.props.user;
    console.log(userId);
    this.props.dispatch(getUserLists(userId));
    let { id } = this.props.match.params;
    this.props.dispatch(pullRestaurantInfo(id));
  };

  onSubmit(e) {
    e.preventDefault();
    const currentRestaurant = this.props.currentRestaurant;
    const userNotes = "";
    const selectedList = this.listAdd.value;
    console.log(selectedList, currentRestaurant);

    this.props.dispatch(addRestaurantToList(selectedList, currentRestaurant, userNotes));
  }


  render() {
    let searchList = [];
    if(this.props.userLists!== undefined && this.props.userLists.length > 0){
      searchList = this.props.userLists.map((list, index) => (
        <option 
          value={list._id} 
          key={index}
          >{list.name}</option>
      ));
    }

    return (
      (this.props.currentRestaurant.location !== undefined) ? 
        <div>
          <Header />
          <section className="singleRestaurant">
            <h2>{this.props.currentRestaurant.name}</h2>
            <div id="img-placeholder">
              <img src={this.props.currentRestaurant.featured_image} className="individual-restaurant-img" alt="featured-restaurant" />
            </div>
            <p>{this.props.currentRestaurant.location.address}</p>
            <p>{this.props.currentRestaurant.location.locality}</p>
            <p>{this.props.currentRestaurant.cuisines}</p>
            {this.props.user!="" ? 
            <form onSubmit={e=>this.onSubmit(e)}>
              <div className="edit-restaurant-info">
                  <label htmlFor="select" className="addListLabel">Add to list:</label>
                  <select
                    ref={input => (this.listAdd = input)}
                  >
                    {searchList}
                  </select>
              </div>
              <div>
                <button><Link to="/search">Back</Link></button>
                <input 
                  type="submit" 
                  value="Save" 
                  className="save-button"
                  />
              </div>
            </form>
          : <Link to="/auth/login" className="save-button">Login to Save</Link>}
          </section>
          <Nav />
        </div>
        : <div>Loading...</div>
      );
  }
};

export const mapStateToProps = (state, props) => ({
  currentRestaurant: state.currentRestaurant, 
  userLists: state.userLists,
  user: state.user
});

export default connect(mapStateToProps)(IndividualRestaurantSearch);