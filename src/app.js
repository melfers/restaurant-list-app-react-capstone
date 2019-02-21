import React from 'react';

import Header from './components/header';
import LandingPage from './components/landing-page';
import SignupPage from './components/signup-page';
import LoginPage from './components/login-page';
import AllLists from './components/all-lists-page';
import AddList from './components/add-list-page';
import { IndividualList } from './components/individual-list-page';
import IndividualRestaurant from './components/individual-restaurant-page';
import SearchPage from './components/search-page';
import ProfilePage from './components/profile-page';
import Nav from './components/nav';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NomApp extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <main role="main">
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/auth/signup" component={SignupPage} />
            <Route exact path="/auth/login" component={LoginPage} />
            <Route exact path="/lists/user" component={AllLists} />
            <Route exact path="/lists/user/addList" component={AddList} />
            <Route exact path="/lists/user/listName" component={IndividualList} />
            <Route exact path="/search/restaurantName" component={IndividualRestaurant} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/user" component={ProfilePage} />
            <Nav />
          </main>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(NomApp);