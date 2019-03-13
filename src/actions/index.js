import jwtDecode from 'jwt-decode';
import { API_ORIGIN } from '../config';

/* Action Types */
export const REQUEST = 'REQUEST';
export const LOGIN = 'LOGIN';
export const SIGNUP_USER = 'SIGNUP_USER';
export const GET_LISTS = 'GET_LISTS';
export const CREATE_LIST = 'CREATE_LIST';
export const DISPLAY_SEARCH_RESULTS = 'DISPLAY_SEARCH_RESULTS';
export const DISPLAY_SEARCH_RESTAURANT = 'DISPLAY_SEARCH_RESTAURANT';
export const DISPLAY_LIST_RESTAURANT = 'DISPLAY_LIST_RESTAURANT';
export const ADD_USER_NOTES = 'ADD_USER_NOTES';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';
export const AUTH_REQUEST = "AUTH_REQUEST";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const ERROR = "ERROR";
export const LOGGED_IN = "LOGGED_IN";


/*Action Creators*/
export const request = () => ({
  type: REQUEST
});

export const loginUser = user => ({
  type: LOGIN,
  user
});

export const signup = user => ({
  type: SIGNUP_USER,
  user
});

export const getLists = userId => ({
  type: GET_LISTS,
  userId
});

export const createList = (newList) => ({
  type: CREATE_LIST,
  newList
});

export const displaySearchResults = searchResults => ({
  type: DISPLAY_SEARCH_RESULTS,
  searchResults
});

export const displaySearchRestaurant = currentRestaurant => ({
  type: DISPLAY_SEARCH_RESTAURANT,
  currentRestaurant
});

export const displayListRestaurant = (listId, restaurantId) => ({
  type: DISPLAY_LIST_RESTAURANT,
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
});

export const fetchErr = err => ({
  type: ERROR,
  err
});

export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const loggedIn = () => ({
  type: LOGGED_IN 
});

export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken));
};

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
    .then(dispatch(loggedIn()))
    .then(authToken => storeAuthInfo(authToken.token, dispatch))
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

// Gets saved lists for a user
export const getUserLists= (userId, token) => dispatch => {
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

// addNewList adds a list to All Lists for a user
export const addNewList = (newList) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/lists/user/:id`, {
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
      console.log(res);
      dispatch(createList(res));
    })
    .catch(err => {
      console.log(err);
    });
};

// Finds restaurants using the Zomato API
export const searchRestaurants = (term, cityId, token) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/search/${cityId}/${term}`, {
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
      console.log(res);
      dispatch(addUserNotes(res));
    })
    .catch(err => {
      console.log(err);
    });
};

//Deletes an individual restaurant from a list
export const deleteRestaurantFromList = (currentRestaurant) => dispatch => {
  dispatch(request);
  fetch(`${API_ORIGIN}/lists/user/listname/:id/${currentRestaurant}/edit`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      dispatch(deleteRestaurantFromList(currentRestaurant));
    })
    .catch(err => {
      console.log(err);
    });
};