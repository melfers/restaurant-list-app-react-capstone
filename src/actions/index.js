import jwtDecode from 'jwt-decode';

/* Action Types */
export const LOGIN = 'LOGIN';
export const GET_LISTS = 'GET_LISTS';
export const CREATE_LIST = 'CREATE_LIST';
export const DISPLAY_RESULTS = 'DISPLAY_RESULTS';

/*Action Creators*/
export const loginUser = user => ({
  type: LOGIN,
  user
});

export const getLists = user => ({
  type: GET_LISTS,
  user
});

export const createList = (user, title, description) => ({
  type: CREATE_LIST,
  user,
  title,
  description
});

export const displayResults = restaurants => ({
  type: DISPLAY_RESULTS,
  restaurants
});


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

// getUserLists gets saved lists
export const getUserLists= (user, token) => dispatch => {
  dispatch(request());
  fetch(`${API_ORIGIN}/lists/${user}`, {
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
      dispatch(displayResults(res.response.body));
    })
    .catch(err => {
      console.log(err);
    });
};
