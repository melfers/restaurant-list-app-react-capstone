import React from 'react';

import Header from './header';
import LandingPage from './landing-page';
import SignupPage from './signup-page';
import LoginPage from './login-page';
import AllLists from './all-lists-page';
import AddList from './add-list-page';
import { IndividualList } from './individual-list-page';
import IndividualRestaurant from './individual-restaurant-page';
import SearchPage from './search-page';


/*import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';*/

export default function NomList(props) {
  return (
    <div>
      <Header />
      <main role="main">
        <LandingPage />
        <SignupPage />
        <LoginPage />
        <AllLists />
        <AddList />
        <IndividualList />
        <IndividualRestaurant />
        <SearchPage />
      </main>
    </div>
  );
}