import React from 'react';

import {connect} from 'react-redux';

export function BottomNav() {
    return (
      <div>
        <nav role="navigation" id="bottom-nav">
          <ul id="main-nav">
            <li><a href="#"><img src="images/user.png" alt=" " /></a></li>
            <li><a href="#"><img src="images/magnifier.png" alt=" " /></a></li>
            <li><a href="#"><img src="images/list.png" alt=" " /></a></li>
          </ul>
        </nav>
      </div>
    );
}

export default connect()(BottomNav);