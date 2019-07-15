import { SET_CURRENT_USER_INFO, SESSION_LOGOUT } from "../actions/constants";
import axios from "axios";

const user = {
    id: null,
    name: null,
    email: null,
    createdAt: null,
    updatedAt: null
};
const initialState = {
    isAuthenticated : false,
    session: null,
    user
};

const userReducer = ( state=initialState, {type, payload=null} ) => {
    switch (type) {
        case SET_CURRENT_USER_INFO:
            return setCurrentUser(state, payload);
        case SESSION_LOGOUT:
            return logOut(state);
        default:
            return state
    }
};

const setCurrentUser = (state, payload) => {
    const user = payload.data;
    const session = document.cookie;
    state = Object.assign({}, state, {
        isAuthenticated: true,
        session: session ,
        user: user
    });
    console.log(state);
    return state
};

const logOut = (state) => {
    state = Object.assign({}, state, {
        isAuthenticated: false,
        session: null,
        user
    });
    console.log(state);
    return state
};

export default userReducer;
