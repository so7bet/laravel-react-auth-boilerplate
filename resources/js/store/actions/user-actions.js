import axios from 'axios';
import { SET_CURRENT_USER_INFO } from "./constants";


export const logIn = logInDetails => dispatch => {
    return axios.post('/api/login',logInDetails)
        .then(res => {
            dispatch ({
                type : SET_CURRENT_USER_INFO,
                payload : res.data
            });
            return res
        })
};

// let cookie = document.cookie;
// localStorage.setItem('session', cookie);


