import React from 'react';

import {connect} from 'react-redux';

export function ProfilePage() {
    return (
      <div>
        <div>
          <img src="images/user.png" id="profile-img" />
        </div>
        <h2>Molly</h2>
        <p>You've visited 48 restaurants</p>
        <form>
          <label for="select">Select City:</label>
            <select>
              <option value="sf">San Francisco</option>
              <option value="ny">New York</option>
              <option value="chi">Chicago</option>
              <option value="la">Los Angeles</option>
            </select>
          <input type="submit" value="Save" class="save-button" />
        </form>
      </div>
    );
}

export default connect()(ProfilePage);