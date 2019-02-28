import * as actions from "../actions";

const initialState = {
    user: null,
    error: null,
    loading: false,
    userLists: []
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

    return state;
};