import React from 'react';
import Header from './header';
import Nav from './nav';

import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addNewList, verifyListName } from '../actions';

export class AddList extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        //let inputs = [this.title, this.description];
        let userId = this.props.user;
        console.log(userId);
        const newList = {
            user: userId,
            name: this.name.value,
            description: this.description.value
        };
        this.props.dispatch(verifyListName(newList));
        //add below line as a 'then' in the above function
        this.props.dispatch(addNewList(newList));
        //inputs.map(input => (input.value = ""));
        return <Redirect to="/lists/user/:id" />
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
                        ref={input => (this.name = input)}
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

export const mapStateToProps = state => ({
    user: state.user
});
  
export default connect(mapStateToProps)(AddList);