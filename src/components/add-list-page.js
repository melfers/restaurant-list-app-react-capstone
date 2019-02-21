//Convert to stateful

import React from 'react';

import {connect} from 'react-redux';

export function AddList() {
    return (
        <div>
            <form id="add-list-form">
            <legend>Create a list:</legend>
            <input type="text" placeholder="  Name" required />
            <input type="text" placeholder="  Description" />
            <input type="submit" value="Save" />
            </form>
        </div>
    );
}

export default connect()(AddList);