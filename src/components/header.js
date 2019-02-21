import React from 'react';

import {connect} from 'react-redux';

export function Header() {
    return (
        <div>
            <header role="banner">
                <span className="header-letters">N </span>
                <img src="images/donut.png" id="header-donut" />
                <span className="header-letters"> M</span>
            </header>
        </div>
    );
}

export default connect()(Header);
