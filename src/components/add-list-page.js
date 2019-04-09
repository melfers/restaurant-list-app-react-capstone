import React from 'react';
import Header from './header';
import Nav from './nav';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { verifyNewList } from '../actions';

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
        this.props.dispatch(verifyNewList(newList, () => {
            this.props.history.push(`/lists/user/${this.user}`);
        }));
        //inputs.map(input => (input.value = ""));
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
                    <button><Link to="/lists/user/:id">Back</Link></button>
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