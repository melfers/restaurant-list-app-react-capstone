import React from 'react';
import Header from './header';
import Nav from './nav';
import {connect} from 'react-redux';

export function ProfilePage(props) {
    return (
      <div>
        <Header />
        <div>
          <img src={require("../images/user.png")} id="profile-img" alt=" " />
        </div>
        <h2>Hi Molly!</h2>
        <p>You've visited 48 restaurants</p>
        <button>Log Out</button>
        <Nav />
      </div>
    );
}

export default connect()(ProfilePage);