import jwtDecode from "jwt-decode";
import { API_ORIGIN } from "../config";
import { isNull } from "util";

/* Action Types */
export const REQUEST = "REQUEST";
export const GET_LISTS = "GET_LISTS";
export const CREATE_LIST = "CREATE_LIST";
export const DISPLAY_LIST = "DISPLAY_LIST";
export const DISPLAY_SEARCH_RESULTS = "DISPLAY_SEARCH_RESULTS";
export const DISPLAY_CURRENT_RESTAURANT = "DISPLAY_SEARCH_RESTAURANT";
export const ADD_USER_NOTES = "ADD_USER_NOTES";
export const DELETE_RESTAURANT = "DELETE_RESTAURANT";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const ERROR = "ERROR";
export const LOG_OUT = "LOG_OUT";

/*Action Creators*/
export const request = () => ({
  type: REQUEST
});

export const getLists = lists => ({
  type: GET_LISTS,
  lists
});

export const displayList = currentList => ({
  type: DISPLAY_LIST,
  currentList
});

export const displaySearchResults = searchResults => ({
  type: DISPLAY_SEARCH_RESULTS,
  searchResults
});

export const displayCurrentRestaurant = currentRestaurant => ({
  type: DISPLAY_CURRENT_RESTAURANT,
  currentRestaurant
});

export const addUserNotes = (listId, restaurantId, userNotes) => ({
  type: ADD_USER_NOTES,
  listId,
  restaurantId,
  userNotes
});

export const deleteRestaurant = () => ({
  type: DELETE_RESTAURANT
});

export const fetchErr = err => ({
  type: ERROR,
  err
});

export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const storeAuthInfo = (authToken, dispatch, cb) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken));
  cb(decodedToken.id);
};

export const logUserOut = () => ({
  type: LOG_OUT
});

/*Action Functions*/
export const login = (user, cb) => dispatch => {
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
    .then(authToken => storeAuthInfo(authToken.token, dispatch, cb))
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

export const signupUser = (user, cb) => dispatch => {
  console.log("signup");
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
    .then(authToken => storeAuthInfo(authToken.token, dispatch, cb))
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

// Gets saved lists for a user
export const getUserLists = (userId /*, token*/) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/lists/user/${userId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer "
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(getLists(res));
    })
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

//Verify no list exists with input name
export const verifyNewList = newList => dispatch => {
  const { user, name } = newList;
  dispatch(request());
  fetch(`${API_ORIGIN}/addList/verify/${user}`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(name)
  })
    .then(response => response.json())
    .then(data => {
      if (!data.result === isNull) {
        alert(
          "Sorry, there is already a list with that name. Please try a new one!"
        );
      } else {
        addNewList(newList);
      }
    })
    .catch(error => console.error(error));
};

// addNewList adds a list to All Lists for a user
export const addNewList = (newList, cb) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/user/add/list`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(newList)
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      cb();
    })
    .catch(err => {
      console.log(err);
    });
};

// Gets a single list for a user
export const getSingleList = listId => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/singleList/${listId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(displayList(res));
    })
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

//Deletes a list
export const deleteIndividualList = (listId, cb) => dispatch => {
  dispatch(request);
  fetch(`${API_ORIGIN}/deleteList/${listId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => cb())
    .catch(err => {
      console.log(err);
    });
};

// Finds restaurants using the Zomato API
export const searchRestaurants = (cityId, term /*token*/) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/search/${cityId}/${term}`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
      /*Authorization: `Bearer ${token}`*/
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      dispatch(displaySearchResults(data));
    })
    .catch(err => {
      console.log(err);
    });
};

// Pulls individual restaurant info for a selected restaurant from search
export const pullRestaurantInfo = (id, token) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/singleRestaurant/${id}`, {
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
    .then(data => {
      dispatch(displayCurrentRestaurant(data));
    })
    .catch(err => {
      console.log(err);
    });
};

// Pulls individual restaurant info for a selected restaurant from a list
export const getRestaurantInfoList = restaurantId => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/restaurant/${restaurantId}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*"
      //Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(displayCurrentRestaurant(res));
    })
    .catch(err => {
      console.log(err);
    });
};

// Adds user's notes to an individual restaurant
/*export const postUserNotes = (listId, currentRestaurant, userNotes) => dispatch => {
  const userNotesObj = {
    currentRestaurant,
    userNotes
  }
  dispatch(request());
  fetch(`${API_ORIGIN}/list/edit/${listId}/${currentRestaurant}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
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
      dispatch(addUserNotes(res));
    })
    .catch(err => {
      console.log(err);
    });
};*/

// Gets all restaurants on a single list
export const pullSingleList = listId => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/singleList/${listId}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*"
      //Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      dispatch(displayList(data));
    })
    .catch(err => {
      console.log(err);
    });
};

// Adds a single restaurant to an existing user list
export const addRestaurantToList = (
  selectedList,
  currentRestaurant,
  userNotes,
  listName,
  cb
) => dispatch => {
  const newRestaurant = {
    listId: selectedList,
    listName: listName,
    restaurantInfo: currentRestaurant,
    notes: userNotes
  };
  dispatch(request());
  fetch(`${API_ORIGIN}/list/add/${selectedList}/${currentRestaurant.id}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(newRestaurant)
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(cb())
    .catch(err => {
      console.log(err);
    });
};

//Deletes an individual restaurant from a list
export const deleteRestaurantFromList = (currentRestaurant, cb) => dispatch => {
  dispatch(request);
  fetch(`${API_ORIGIN}/restaurant/delete/${currentRestaurant}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      dispatch(deleteRestaurant());
    })
    .then(cb())
    .catch(err => {
      console.log(err);
    });
};

//Logs a user out
export const logOut = cb => dispatch => {
  dispatch(logUserOut());
  cb();
};
