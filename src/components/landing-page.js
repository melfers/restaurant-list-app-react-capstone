import React from 'react';

import { Link } from 'react-router-dom';

export default function LandingPage() {
    return(
        <div>
            <h1 id="landing-header">Nom List</h1>
            <h4>An app that helps you track and rate restaurant visits</h4>
            <img src={require("../images/donut.png")} id="main-donut" alt=" " />
            <Link to='/auth/login'>
                <button>Log In</button>
            </Link>
            <Link to='/auth/signup'>
                <button>Sign Up</button>
            </Link>
        </div>
    );
}
