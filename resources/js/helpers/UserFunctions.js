import axios from 'axios'
// import { Base_URL } from './Base_URL'

export const register = newUser => {
    return axios
        .post('/api/signup', newUser, {
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
};

export const login = user => {
    return axios
        .post('/api/login',{
            email: user.email,
            password: user.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data.token);
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
};

export const getProfile = () => {
    return axios
        .get('/api/profile', {
            headers: {Authorization: `Bearer ${localStorage.usertoken}`}
        })
        .then(res => {
            return res.data;

        })
        .catch(err => {
            console.log(err)
        })
};



