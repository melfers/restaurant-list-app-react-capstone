import React from 'react';

import { connect } from 'react-redux';

export function LoginPage() {
    return (
      <div>
        <div id="login-header">
          <h1 className="second-header">N  </h1>
          <img src="images/donut.png" className="sub-donut" alt=" " />
          <h1 className="second-header">  M</h1>
        </div>
        <h2>Log In</h2>
        <form>
          <div>
            <label htmlFor="username"></label>
            <input type="text" placeholder="  Username" />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input type="text" placeholder="  Password" />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
}

export default connect ()(LoginPage);