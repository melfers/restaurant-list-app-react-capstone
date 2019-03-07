import React from 'react';
import Spinner from 'react-spinkit';
import {connect} from 'react-redux';

import { Link } from 'react-router-dom';
 
export class Lists extends React.Component {
    render() {
        if (this.props.loading) {
          return (
            <div className="spinner-container">
              <Spinner className="spinner" name="circle" />
            </div>
          );
        }



        let listArray = [];

        // for rendering all lists
        if (this.props.userLists.length > 0) {
            listArray = this.props.userLists.map((list, index) => (
                <li 
                    className="restaurant-card" 
                    key={index}
                    id={list._id}
                    onClick={e => this.playVideo(e.currentTarget, "search")}
                >
                    <Link to="/lists/user/listName/:id">
                        <h2>{list.title}</h2>
                        <p>{list.description}</p>
                    </Link>
                </li>
            ));
            return (
                <ul className="list">
                    {listArray}
                </ul>
            );
        }
    }
}

export const mapStateToProps = state => ({
    lists: state.lists,
    loading: state.loading,
    authToken: state.authToken
});
  
export default connect(mapStateToProps)(Lists);