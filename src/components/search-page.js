import React from "react";
import Nav from "./nav";
import Header from "./header";
import SearchForm from "./search-form";
import SearchResults from "./search-results"

import { connect } from "react-redux";
import { searchRestaurants } from "../actions";

export class SearchPage extends React.Component {

  onSearch(term) {
    this.props.dispatch(searchRestaurants(term));
  }

  render() {
    return (
      <div>
        <Header />
        <section>
          <h2>Search</h2>
          <SearchForm
            placeholder="Search"
            onSearch={term => this.onSearch(term)}
          />
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