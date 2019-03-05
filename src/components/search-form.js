import React from 'react';

export default class SearchForm extends React.Component {
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
                <input type="submit" value="Search" />
            </form>
        );
    }
}
