import React from 'react';

import {connect} from 'react-redux';

export function BottomNav() {
    return (
        <nav role="navigation" id="bottom-nav">
        <ul id="main-nav">
          <li><a href="#"><img src="images/user.png"></a></li>
          <li><a href="#"><img src="images/magnifier.png"></a></li>
          <li><a href="#"><img src="images/list.png"></a></li>
        </ul>
      </nav>
    );
}

export default connect()(BottomNav);