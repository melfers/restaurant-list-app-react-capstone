import React from 'react';

import { connect } from 'react-redux';

export function LoginPage() {
    return (
      <div>
        <div id="login-header">
          <h1 class="second-header">N  </h1>
          <img src="images/donut.png" class="sub-donut" />
          <h1 class="second-header">  M</h1>
        </div>
        <h2>Log In</h2>
        <form>
          <div>
            <label for="username"></label>
            <input type="text" placeholder="  Username" />
          </div>
          <div>
            <label for="password"></label>
            <input type="text" placeholder="  Password" />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
}

export default connect ()(LoginPage);