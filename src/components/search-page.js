//Convert to stateful

import React from 'react';

import {connect} from 'react-redux';

export default class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const input = this.textInput.value.trim();
        if(input && this.props.onSearch) {
            this.props.onSearch(this.textInput.value);
        }
        this.textInput.value = "";
    }

    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="search">Search:</label>
                    <input 
                        type="text"
                        ref={input => (this.textInput = input)} 
                />
                {this.props.results}
                <ul className="lists">
                    <li className="restaurant-card">
                        <img src="images/stock-donut.jpg" alt=" " />
                        <h2>Bob's Donuts</h2>
                        <p>Breakfast  |  Rating: 4.5</p>
                    </li>
                </ul>
            </form>
        );
    }
}

export default connect()(SearchPage);