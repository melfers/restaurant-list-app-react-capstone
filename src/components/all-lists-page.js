import React from 'react';
import Header from './header';
import Lists from './lists';
import Nav from './nav';

import { Link, Redirect } from 'react-router-dom';

export default function AllLists(props) {
    if (!props.loggedIn) {
      return <Redirect to="/" />;
    }
  
    if (props.error) {
      return <div className="unauthorized">{props.error}</div>;
    }
  
    return (
      <div>
        <Header />
        <section className="lists">
          <h2>My Lists</h2>
          <Lists />
        </section>
        <Link to="/lists/user/addList">
            <button>Add List</button>
        </Link>
        <Nav />
      </div>
    );
}


