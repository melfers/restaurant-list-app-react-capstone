import React from 'react';

import {connect} from 'react-redux';

export default function AllLists(prop) {
    return (
        <div>
            <ul className="lists">
            <li className="restaurant-card">
                <img src="images/stock-donut.jpg" alt=" " />
                <Lists />
                <h2>To Visit</h2>
                <p>Places on my bucket list</p>
            </li>
            </ul>
        </div>
    );
}

export default connect()(AllLists);

export default function AllLists(props) {
    if (!props.loggedIn) {
      return <Redirect to="/" />;
    }
  
    if (props.error) {
      return <div className="unauthorized">{props.error}</div>;
    }
  
    return (
      <div>
        <Nav />
        <section className="lists">
          <h2>My Lists</h2>
          <Lists />
        </section>
        <Link to="/lists/user/addList">
            <button>Add List</button>
        </Link>
      </div>
    );
}