import React from 'react';
import {connect} from 'react-redux';

export function LandingPage() {
    return(
        <h1 id="landing-header">Nom List</h1>
        <h4>An app that helps you track and rate restaurant visits</h4>
        <img src="images/donut.png" id="main-donut">
        <button>Log In</button>
        <button>Sign Up</button>
    );
}

export default connect()(LandingPage);