import * as actions from "../actions";

const initialState = {
    authToken: '',
    user: '',
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

    if (action.type === actions.LOG_USER) {
    return Object.assign({}, state, {
        error: null,
        loading: false,
        user: action.user
    });
    }

    if (action.type === actions.CHAT_USERS) {
        return Object.assign({}, state, {
          error: null,
          loading: false,
          chatUsers: action.users
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
            user: action.currentUser.id
        });
    }

    if (action.type === actions.GET_LISTS) {
        return Object.assign({}, state, {
            loading: false,
            userLists: action.lists
        });
    }

    /*if (action.type === actions.CREATE_LIST) {
        //const list = actions.list;
        return Object.assign({}, state, {
          loading: false, 
          userLists: action.newList
        });
    }*/

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
        console.log('action',currentRestaurant);
        return Object.assign({}, state, {
            error: null,
            loading: false,
            currentRestaurant: currentRestaurant
        });
    }

    /*if (action.type === actions.DISPLAY_LIST_RESTAURANT) {
        const currentRestaurant = action.displayRestaurant;
        return Object.assign({}, state, {
            currentRestaurant: currentRestaurant
        });
    }*/

    if (action.type === actions.DISPLAY_LIST) {
        const currentList = action.currentList;
        return Object.assign({}, state, {
            error: null,
            loading: false,
            currentList: currentList
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

    if (action.type === actions.DELETE_RESTAURANT) {
        return Object.assign({}, state, {
          loading: false,
          currentRestaurant: []
        });
    
    }

    return state;
};