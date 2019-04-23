import React from "react";

import { Link, Redirect } from "react-router-dom";

export default function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to={`/lists/user/${props.user}`} />;
  }
  return (
    <div>
      <h1 id="landing-header">Nom List</h1>
      <h4>
        An app that allows you to search for local restaurants, and create lists
        of places you'd like to go, or have already visited!
      </h4>
      <img src={require("../images/donut.png")} id="main-donut" alt=" " />
      <Link to="/auth/login">
        <button>Log In</button>
      </Link>
      <Link to="/auth/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}
