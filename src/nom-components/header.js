import React from 'react';

import {connect} from 'react-redux';

export function MainHeader() {
    return (
        <header role="banner">
            <span class="header-letters">N </span>
            <img src="images/donut.png" id="header-donut">
            <span class="header-letters"> M</span>
        </header>
    );
}

export default connect()(MainHeader);