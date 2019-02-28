import React from 'react';

import {connect} from 'react-redux';

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

export default connect()(AllLists);

