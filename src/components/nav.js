import React from 'react';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { getLists } from '../actions/index';

export class Nav extends React.Component {
  getAllLists() {
    this.props.dispatch(getLists(this.props.user));
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
                <Link to="/lists/user/:id" onClick={() => this.getAllLists()}>
                <img src="images/list.png" alt=" " /></Link>
              </li>
            </ul>
          </nav>
        </div>
    );
  };
}

export const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Nav);
