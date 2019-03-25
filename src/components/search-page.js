import React from "react";
import Nav from "./nav";
import Header from "./header";
import SearchResults from "./search-results"

import { connect } from "react-redux";
import { searchRestaurants } from "../actions";

export class SearchPage extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    const searchTerm = this.refs.searchTerm.value;
    const cityId = 306;
    //const input = this.textInput.value.trim();
    this.props.dispatch(searchRestaurants(searchTerm, cityId));
    //.value = "";
  }

  render() {
    return (
      <div>
        <Header />
        <section>
          <h2>Find a restaurant</h2>
          <form onSubmit={ (e) => this.onSubmit(e)}>
            <input 
                type="text"
                ref="searchTerm"
            />
            <input type="submit" value="Search" />
          </form>
          <div>
            <SearchResults />
          </div>
        </section>
        <Nav />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  searchResults: state.searchResults,
  error: state.error,
  authToken: state.authToken
});

export default (connect(mapStateToProps)(SearchPage));