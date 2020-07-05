import {
    REGISTER_SUCCESS,
    USER_LOADED,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

export const authReducer = (state, action) => {
    switch (action.type) {

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
                user: null,
                isAuthenticated: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        case USER_LOADED:

            // action.payload is the user data received from loadUser func.

            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };

        default:
            return state;

    }
}