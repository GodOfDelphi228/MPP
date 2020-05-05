/*import jwt_decode from "jwt-decode";
import {RestRequest} from "./requests";
import {endpoints} from "./endpoints";
import Axios from "axios";

const getUserFromStorage = () => {
    let token = localStorage.getItem('Jwt token');
    if (!token) return null;
    let data = jwt_decode(token);
    let user = {
        name: data.name,
        surname: data.surname,
        email: data.email
    };
    return user;
};

const afterLogin = response => {
    if (response.data.token) {
        localStorage.setItem('Jwt token', `${response.data.token}`);
    }
    return response;
};
const registration = (name, surname, email, password) =>
    RestRequest.post(endpoints.registration, {}, {name, surname, email, password})
        .then(afterLogin);
/*Axios.post(endpoints.registration,
    {name: name, surname: surname, email: email, password: password},
    {headers: {}}).then(response => {
    console.log(response.data);
    afterLogin(response);
    ;
});

const login = (email, password) =>
    RestRequest.post(endpoints.login, {}, {email, password})
        .then(afterLogin);

const logout = () => {
    localStorage.removeItem('Jwt token');
};
export default {
    login,
    getUserFromStorage,
    registration,
    logout
}
*/

import jwt_decode from "jwt-decode";
import {authEndpoints} from "./endpoints";
import {RestRequest} from "./requests";

export const getUserFromStorage = () => {
    let token = localStorage.getItem('Jwt token');
    if (!token) return null;
    let data = jwt_decode(token);
    let user = {
        name: data.name,
        email: data.email,
        id: data.id
    };
    console.log(user);
    return user;
};

const afterLogin = response => {
    if (response.data.token) {
        localStorage.setItem('Jwt token', `${response.data.token}`);
    }
    return response;
};
const registration = (name, email, password) =>
    RestRequest.post(authEndpoints.registration, {}, {name, email, password})
        .then(afterLogin);

const login = (email, password) =>
    RestRequest.post(authEndpoints.login, {}, {email, password})
        .then(afterLogin);

const logout = () => {
    localStorage.removeItem('Jwt token');
};
export default {
    login,
    getUserFromStorage,
    registration,
    logout
}
