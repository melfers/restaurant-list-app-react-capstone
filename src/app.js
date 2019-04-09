import React , { Component } from 'react';

import LandingPage from './components/landing-page';
import SignupPage from './components/signup-page';
import LoginPage from './components/login-page';
import AllLists from './components/all-lists-page';
import AddList from './components/add-list-page';
import IndividualList from './components/individual-list';
import IndividualRestaurant from './components/individual-restaurant';
import IndividualRestaurantEdit from './components/individual-restaurant-edit';
import IndividualRestaurantSearch from './components/individual-restaurant-search';
import SearchPage from './components/search-page';
import ProfilePage from './components/profile-page';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';


class NomApp extends Component {
  render() {
    return (
      <Router>
        <div>
          <main role="main">
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/auth/signup" component={SignupPage} />
            <Route exact path="/auth/login" component={LoginPage} />
            <Route path="/lists/user/:id" render={() => <AllLists 
              error={this.props.error} 
              loggedIn={this.props.loggedIn} 
              userLists={this.props.userLists} 
              />} 
            />
            <Route exact path="/user/add/list" component={AddList} />
            <Route path="/singleList/:listId" component={IndividualList} />
            <Route path="/restaurant/:restaurantId" component={IndividualRestaurant} />
            <Route path="/list/edit/:listId/:restaurantId" component={IndividualRestaurantEdit} />
            <Route path="/search" component={SearchPage} />
            <Route path="/singleRestaurant/:id" component={IndividualRestaurantSearch} />
            <Route exact path="/user" component={ProfilePage} />
          </main>
        </div>
      </Router>
    );
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.user,
  error: state.error,
  userLists: state.userLists
});

export default connect(mapStateToProps)(NomApp);