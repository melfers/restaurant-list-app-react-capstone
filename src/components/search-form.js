import React from 'react';

import { connect } from 'react-redux';
import { searchRestaurants } from '../actions'; 

export default class SearchForm extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const input = this.textInput.value.trim();
        if (input && this.props.onSearch) {
            this.props.onSearch(this.textInput.value);
          }
        input.value = "";
    }

    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type="text"
                    ref={input => (this.textInput = input)} 
                />
                <input type="submit" value="Search" />
            </form>
        );
    }
}
