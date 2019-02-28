import React from 'react';

import {connect} from 'react-redux';

export class Nav extends React.Component {

  getAllLists() {
    this.props.dispatch(getAllLists(this.props.user, this.props.authToken));
  }

  render() {  
    return (
        <div>
          <nav role="navigation" id="bottom-nav">
            <ul id="main-nav">
              <li>
                <Link to="/user"><img src="images/user.png" alt=" " /></Link>
              </li>
              <li>
                <Link to="/search"><img src="images/magnifier.png" alt=" " /></Link>
              </li>
              <li>
                <Link to="/allLists" onClick={() => this.getAllLists()}>
                <img src="images/list.png" alt=" " /></Link>
              </li>
            </ul>
          </nav>
        </div>
    );
  };
}

export default connect()(Nav);
