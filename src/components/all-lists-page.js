import React from "react";
import Header from "./header";
import Lists from "./lists";
import Nav from "./nav";

import { Link } from "react-router-dom";

export default function AllLists(props) {
  if (props.error) {
    return <div className="unauthorized">{props.error}</div>;
  }

  return (
    <div>
      <Header />
      <section className="lists">
        <h2>My Lists</h2>
        <Lists user={props.userLists} />
      </section>
      <Link to="/user/add/list">
        <button>Add List</button>
      </Link>
      <Nav />
    </div>
  );
}
