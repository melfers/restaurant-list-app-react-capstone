import React from 'react';

import {connect} from 'react-redux';

export function AddList() {
    return (
        <form id="add-list-form">
          <legend>Create a list:</legend>
          <input type="text" placeholder="  Name" required>
          <input type="text" placeholder="  Description">
          <input type="submit" value="Save">
        </form>
    );
}

export default connect()(AddList);