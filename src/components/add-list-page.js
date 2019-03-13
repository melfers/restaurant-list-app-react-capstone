import React from 'react';
import Header from './header';
import Nav from './nav';

import {connect} from 'react-redux';

import { addNewList } from '../actions';

export class AddList extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const inputs = [this.title, this.description];
        const newList = {
            user: this.props.user,
            title: this.title.value,
            description: this.description.value
        };
        this.props.dispatch(addNewList(newList));
        inputs.map(input => (input.value = ""));
    }

    render() {
        return (
            <div>
                <Header />
                <form id="add-list-form" onSubmit={this.onSubmit}>
                    <legend>Create a list:</legend>
                    <input 
                        type="text" 
                        placeholder="  Name" 
                        ref={input => (this.title = input)}
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="  Description" 
                        ref={input => (this.description = input)}
                        required 
                    />
                    <input type="submit" value="Save" />
                </form>
                <Nav />
            </div>
        )
    };
}

export default connect()(AddList);