import React from 'react';

import {connect} from 'react-redux';
 
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
    if (this.props.lists.length > 0) {
        listArray = this.props.lists.map((list, index) => {
            return (
                <div className="restaurant-card" key={index}>
                    <Link to="/lists/user/listName">
                        <h2>{list.title}</h2>
                        <p>{list.description}</p>
                    </Link>
                </div>
            );
    });
}

export const mapStateToProps = state => ({
    lists: state.lists,
    loading: state.loading,
    authToken: state.authToken
});
  
export default connect(mapStateToProps)(Lists);