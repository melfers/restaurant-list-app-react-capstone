import * as actions from "../actions";

const initialState = {
    user: null,
    error: null,
    loading: false,
    userLists: [],
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

    if (action.type === actions.LOGIN) {
        return Object.assign({}, state, {
        error: null,
        loading: false,
        user: action.user
        });
    }

    if (action.type === actions.SIGNUP) {
        return Object.assign({}, state, {
          error: null,
          loading: false,
          user: action.user
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
            user: action.currentUser.username,
            userID: action.currentUser.id
        });
    }

    if (action.type === actions.GET_LISTS) {
        return Object.assign({}, state, {
            loading: false,
            userLists: action.lists
        });
    }

    if (action.type === actions.CREATE_LIST) {
        return Object.assign({}, state, {
          loading: false, 
          userLists: action.lists
        });
    }

    if (action.type === actions.DISPLAY_SEARCH_RESULTS) {
    const searchResults = action.searchResults.items;
    return Object.assign({}, state, {
        error: null,
        loading: false,
        searchResults: searchResults
        });
    }

    if (action.type === actions.DISPLAY_RESTAURANT) {
        const currentRestaurant = action.displayRestaurant.currentRestaurant;
        return Object.assign({}, state, {
            currentRestaurant: currentRestaurant
        });
    }

    if (action.type === actions.ADD_USER_NOTES) {
        const currentRestaurant = action.displayRestaurant.currentRestaurant;
        const userNotes = action.addUserNotes.userNotes;
        return Object.assign({}, state, {
            currentRestaurant: currentRestaurant,
            restaurantUserNotes: userNotes
        });
    }
    return state;
};