import React from 'react';
import {connect} from 'react-redux';
import { getUserLists, saveSelectedList } from '../actions';

import { Link } from 'react-router-dom';
 
export class Lists extends React.Component {
    componentDidMount(){
        let userId = this.props.user;
        this.props.dispatch(getUserLists(userId));
    };

    saveRestName(target){
        console.log(target);
        let listName = target.name;
        console.log(listName);
        this.props.dispatch(saveSelectedList(listName));
    }

    render() {
        let listArray = [];

        // for rendering all lists
        if (this.props && this.props.userLists && this.props.userLists.length > 0) {
            listArray = this.props.userLists.map((list, index) => (
                <li 
                    className="restaurant-card" 
                    key={index}
                    id={list._id}
                    name={list.name}
                    onClick={(e => this.saveRestName(e.target))}
                >
                    <Link to={`/singleList/${list._id}`}>
                        <h2>{list.name}</h2>
                        <p>{list.description}</p>
                    </Link>
                </li>
            ));
        } else {
            listArray = "hello";
        }

        return (
            <ul className="list">
                {listArray}
            </ul>
        );
    }
}

export const mapStateToProps = state => ({
    user: state.user,
    authToken: state.authToken,
    loading: state.loading,
    userLists: state.userLists
});
  
export default connect(mapStateToProps)(Lists);