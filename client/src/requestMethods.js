import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';
const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const adminRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: `Bearer ${
            user ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser?.accessToken : ''
        }`,
    },
});
