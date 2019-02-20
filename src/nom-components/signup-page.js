import React from 'react';

import {connect} from 'react-redux';

export function SignupPage() {
    return (
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="  Name">
          <input type="text" placeholder="  Email">
          <input type="text" placeholder="  Password">
          <input type="text" placeholder="  Re-enter password">
          <div>
            <button>Back</button>
            <input type="submit">
          </div>
        </form>
    );
}

export default connect()(SignupPage);