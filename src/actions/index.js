import jwtDecode from 'jwt-decode';

/* Action Types */
export const LOGIN = 'LOGIN';
export const GET_LISTS = 'GET_LISTS';
export const CREATE_LIST = 'CREATE_LIST';
export const DISPLAY_SEARCH_RESULTS = 'DISPLAY_SEARCH_RESULTS';
export const DISPLAY_SEARCH_RESTAURANT = 'DISPLAY_SEARCH_RESTAURANT';
export const DISPLAY_LIST_RESTAURANT = 'DISPLAY_LIST_RESTAURANT';
export const ADD_USER_NOTES = 'ADD_USER_NOTES';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT'

/*Action Creators*/
export const loginUser = user => ({
  type: LOGIN,
  user
});

export const getLists = userId => ({
  type: GET_LISTS,
  userId
});

export const createList = (user, title, description) => ({
  type: CREATE_LIST,
  user,
  title,
  description
});

export const displaySearchResults = searchResults => ({
  type: DISPLAY_SEARCH_RESULTS,
  searchResults
});

export const displaySearchRestaurant = currentRestaurant => ({
  type: DISPLAY_RESTAURANT,
  currentRestaurant
});

export const displayListRestaurant = (listId, restaurantId) => ({
  type: DISPLAY_RESTAURANT,
  listId,
  restaurantId
});

export const addUserNotes = (listId, restaurantId, userNotes) => ({
  type: ADD_USER_NOTES,
  listId,
  restaurantId,
  userNotes
});

export const deleteRestaurant = (restaurantId) => ({
  type: DELETE_RESTAURANT,
  restaurantId
})

/*Action Functions*/
export const login = user => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(authToken => storeAuthInfo(authToken.token, dispatch))
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

export const signupUser = user => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/auth/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(authToken => storeAuthInfo(authToken.token, dispatch))
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

// Gets saved lists for a user
export const getUserLists= (userId token) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/lists/user/${userId}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(getLists(res.lists));
    })
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

// addNewList adds a list to All Lists 
export const addNewList = (user, title, description) => dispatch => {
  const listObject = {
    user,
    title,
    description
  };

  dispatch(request());
  fetch(`${API_ORIGIN}/lists/user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(listObject)
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      console.log(res);
      dispatch(createList(res));
    })
    .catch(err => {
      console.log(err);
    });
};

// Finds restaurants using the Zomato API
export const searchRestaurants = (term, token) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/search/${term}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(displaySearchResults(res.response.body));
    })
    .catch(err => {
      console.log(err);
    });
};

// Pulls individual restaurant info for a selected restaurant from search
export const pullRestaurantInfo = (id, token) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/search/restaurant/${id}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(displaySearchRestaurant(res.response.body));
    })
    .catch(err => {
      console.log(err);
    });
};

// Pulls individual restaurant info for a selected restaurant from a list
export const getRestaurantInfoList = (listId, restaurantId, token) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/lists/user/listname/${listId}/${restaurantId}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(displayListRestaurant(res.response.body));
    })
    .catch(err => {
      console.log(err);
    });
};

// Adds user's notes to an individual restaurant
export const postUserNotes = (currentRestaurant, userNotes) => dispatch => {
  const userNotesObj = {
    currentRestaurant,
    userNotes
  }
  dispatch(request());
  fetch(`${API_ORIGIN}/lists/user/listname/:id/:restaurantId/edit`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userNotesObj)
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      console.log(res);
      dispatch(addUserNotes(res));
    })
    .catch(err => {
      console.log(err);
    });
};

//Deletes an individual restaurant from a list
export const deleteRestaurant = (currentRestaurant) => dispatch => {
  dispatch(request);
  fetch(`${API_ORIGIN}/lists/user/listname/:id/${currentRestaurant}/edit`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      dispatch(deleteFromList(currentRestaurant));
    })
    .catch(err => {
      console.log(err);
    });
};