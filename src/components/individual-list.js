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

    componentDidMount() {
        let { listId } = this.props.match.params;
        this.props.dispatch(pullSingleList(listId));
    }

    /*showRestaurantInfo(target) {
        let restaurantId = target.id;
        console.log(restaurantId);
        this.props.dispatch(getRestaurantInfoList(restaurantId, ()=>{
            this.props.history.push(`/list/restaurant/${restaurantId}`);
        }));
    }*/

    deleteSelectedList() {
        let { listId } = this.props.match.params;
        this.props.dispatch(deleteIndividualList(listId, () => {
            this.props.history.push(`/lists/user/${this.props.user}`);
        }));
    }

    render() {
        let restaurantArray = [];

        if(this.props.currentList!== undefined && this.props.currentList.length > 0){
            restaurantArray = this.props.currentList.map((restaurant, index) => {
                let finalImage = (restaurant.thumb !== '') ? restaurant.thumb : require('../images/stock-donut.jpg');
                return(
                    <Link to={`/restaurant/${restaurant._id}`}>
                        <li 
                            className="restaurant-card"
                            id={restaurant._id}
                            key={index}
                        >   
                            <div className="restaurant-container">
                                <div className="restaurant-img-container">
                                    <img src={finalImage} alt="thumbnail" className="thumbImg"  />
                                </div>
                                <div className="rest-info">
                                    <h2>{restaurant.name}</h2>
                                    <p>{restaurant.cuisines}</p>
                                </div>
                            </div>
                        </li>
                    </Link>
                )
            })
        }
    
        return (
        <div>
            <Header />
            <section>
                <h2>{this.props.currentListName}</h2>
                <ul className="lists"> 
                    {restaurantArray}
                </ul> 
                <button
                    onClick={(e => this.deleteSelectedList())}
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
    user: state.user,
    currentList: state.currentList,
    currentListName: state.currentListName,
    error: state.error
});

export default connect(mapStateToProps)(IndividualList);