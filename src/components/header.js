import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export function Header() {
    return (
        <div>
            <Link to="/">
                <header role="banner">
                    <div id="top-header">
                        <span className="header-letters">N </span>
                        <img src={require("../images/donut.png")} id="header-donut" alt=" " />
                        <span className="header-letters"> M</span>
                    </div>
                </header>
            </Link>
        </div>
    );
}

export default connect()(Header);
