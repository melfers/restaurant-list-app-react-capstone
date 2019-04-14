import * as actions from "../actions";

const initialState = {
  authToken: "",
  user: "",
  error: null,
  loading: false,
  userLists: [],
  currentList: [],
  searchResults: [],
  currentRestaurant: [],
  restaurantUserNotes: []
};

export const reducer = (state = initialState, action) => {
  if (action.type === actions.ERROR) {
    return Object.assign({}, state, {
      error: action.err,
      loading: false
    });
  }

  if (action.type === actions.SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken,
      loading: false
    });
  }

  if (action.type === actions.AUTH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      user: action.currentUser
    });
  }

  if (action.type === actions.GET_LISTS) {
    return Object.assign({}, state, {
      loading: false,
      userLists: action.lists
    });
  }

  if (action.type === actions.DISPLAY_SEARCH_RESULTS) {
    const searchResults = action.searchResults;
    return Object.assign({}, state, {
      error: null,
      loading: false,
      searchResults: searchResults
    });
  }

  if (action.type === actions.DISPLAY_CURRENT_RESTAURANT) {
    const currentRestaurant = action.currentRestaurant;
    return Object.assign({}, state, {
      error: null,
      loading: false,
      currentRestaurant: currentRestaurant
    });
  }

  if (action.type === actions.DISPLAY_LIST) {
    const currentList = action.currentList;
    return Object.assign({}, state, {
      error: null,
      loading: false,
      currentList: currentList
    });
  }

  if (action.type === actions.DELETE_RESTAURANT) {
    return Object.assign({}, state, {
      loading: false,
      currentRestaurant: []
    });
  }

  if (action.type === actions.LOG_OUT) {
    return Object.assign({}, state, {
      authToken: "",
      user: "",
      error: null,
      loading: false,
      userLists: [],
      currentList: [],
      searchResults: [],
      currentRestaurant: [],
      restaurantUserNotes: []
    });
  }

  return state;
};
