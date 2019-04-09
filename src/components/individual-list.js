import React from 'react';
import Header from './header';
import Nav from './nav';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { pullSingleList, deleteIndividualList } from '../actions';

export class IndividualList extends React.Component {  
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let { listId } = this.props.match.params;
        console.log(listId);
        this.props.dispatch(pullSingleList(listId));
    }

    /*showRestaurantInfo(target) {
        let restaurantId = target.id;
        console.log(restaurantId);
        this.props.dispatch(getRestaurantInfoList(restaurantId, ()=>{
            this.props.history.push(`/list/restaurant/${restaurantId}`);
        }));
    }*/

    deleteSelectedList(target) {
        this.props.dispatch(deleteIndividualList(this.props.currentList));
    }

    render() {
        let restaurantArray = [];

        if(this.props.currentList!== undefined && this.props.currentList.length > 0){
            restaurantArray = this.props.currentList.map((restaurant, index) => {
                let finalImage = (restaurant.featured_image !== '') ? restaurant.featured_image : require('../images/stock-donut.jpg');
                return(
                    <Link to={`/restaurant/${restaurant._id}`}>
                        <li className="restaurant-card"
                            id={restaurant._id}
                            key={index}
                        >
                            <img src={finalImage} className="thumbImg" alt="featured-restaurant" />
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.cuisines}</p>
                        </li>
                    </Link>
                )
            })
        }
    
        return (
        <div>
            <Header />
            <section className="lists">
                <h2>List Name Goes Here</h2>
                {restaurantArray}
                <button
                    onClick={(e => this.deleteSelectedList(e.currentTarget))}
                >
                Delete List
                </button>
            </section>
            <Nav />
        </div>
        );
    }
}

export const mapStateToProps = (state, props) => ({
    currentList: state.currentList,
    error: state.error
});

export default connect(mapStateToProps)(IndividualList);