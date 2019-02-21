//Convert to stateful

import React from 'react';
import {connect} from 'react-redux';

export function LandingPage() {
    return(
        <div>
            <h1 id="landing-header">Nom List</h1>
            <h4>An app that helps you track and rate restaurant visits</h4>
            <img src="images/donut.png" id="main-donut" alt=" " />
            <button>Log In</button>
            <button>Sign Up</button>
        </div>
    );
}

export default connect()(LandingPage);