import jwtDecode from 'jwt-decode';
import { API_ORIGIN } from '../config';
import { isNull } from 'util';

/* Action Types */
export const REQUEST = 'REQUEST';
export const LOG_USER = 'LOG_USER';
export const CHAT_USERS = 'CHAT_USERS';
export const GET_LISTS = 'GET_LISTS';
export const VERIFY_LIST_NAME = 'VERIFY_LIST_NAME';
export const CREATE_LIST = 'CREATE_LIST';
export const DISPLAY_LIST = 'DISPLAY_LIST';
export const DISPLAY_SEARCH_RESULTS = 'DISPLAY_SEARCH_RESULTS';
export const DISPLAY_SEARCH_RESTAURANT = 'DISPLAY_SEARCH_RESTAURANT';
export const DISPLAY_LIST_RESTAURANT = 'DISPLAY_LIST_RESTAURANT';
export const ADD_USER_NOTES = 'ADD_USER_NOTES';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';
export const AUTH_REQUEST = "AUTH_REQUEST";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const ERROR = "ERROR";


/*Action Creators*/
export const request = () => ({
  type: REQUEST
});

export const logUser = user => ({
  type: LOG_USER,
  user
});

export const chatUsers = users => ({
  type: CHAT_USERS,
  users
});

export const getLists = lists => ({
  type: GET_LISTS,
  lists
});

export const verifyListName = newList => ({
  type: VERIFY_LIST_NAME,
  newList
});

export const createList = newList => ({
  type: CREATE_LIST,
  newList
});

export const displayList = list => ({
  type: DISPLAY_LIST,
  list
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

export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const storeAuthInfo = (authToken, dispatch) => {
  console.log('storeauthinfo ran');
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken.password));
  dispatch(authSuccess(decodedToken));
  console.log({ user: decodedToken.email });
  dispatch(logSession({ "user": decodedToken.email }));
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
  console.log(user);
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

export const logSession = user => dispatch => {
  console.log(user);
  fetch(`${API_ORIGIN}/auth/userLoggedIn`, {
    method: "POST",
    mode: "cors",
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
    .then(res => {
      dispatch(chatUsers(res.loggedIn));
    });
};

// Gets saved lists for a user
export const getUserLists= (userId/*, token*/) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/lists/user/${userId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
  })
    .then(res => {
      console.log(res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      console.log(res);
      dispatch(getLists(res));
    })
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

//Verify no list exists with input name
/*export const verifyListName = (newList) => {
  dispatch(request());
  fetch(`${API_ORIGIN}/lists/user/addList/verify`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(newList)
  })
  .then(response => response.json())
  .then(data => {
      if (!data.result == isNull) {
          alert('Sorry, there is already a list with that name. Please try a new one!');
          $('#newPlantNickname').val('');
      }
  })
  .catch(error => console.error(error))
}*/

// addNewList adds a list to All Lists for a user
export const addNewList = (newList) => dispatch => {
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
      console.log(res);
      dispatch(createList(res));
    })
    .catch(err => {
      console.log(err);
    });
};

// Gets a single list for a user
export const getSingleList= (userId, listId) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/user/singleList/:userId/:listId`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
  })
    .then(res => {
      console.log(res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      console.log(res);
      dispatch(displayList(res));
    })
    .catch(err => {
      dispatch(fetchErr(err));
    });
};

// Finds restaurants using the Zomato API
export const searchRestaurants = (term, cityId /*token*/) => dispatch => {
  dispatch(request());
  console.log(cityId, term);
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
      console.log(data.restaurants);
      dispatch(displaySearchResults(data.restaurants));
    })
    .catch(err => {
      console.log(err);
    });
};

// Pulls individual restaurant info for a selected restaurant from search
export const pullRestaurantInfo = (id, token) => dispatch => {
  dispatch(request());
  console.log(id);
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
      console.log(data);
      dispatch(displaySearchRestaurant(data));
    })
    .catch(err => {
      console.log(err);
    });
};

// Pulls individual restaurant info for a selected restaurant from a list
export const getRestaurantInfoList = (listId, restaurantId, token) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/list/${listId}/restaurant/${restaurantId}`, {
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
export const postUserNotes = (listId, currentRestaurant, userNotes) => dispatch => {
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