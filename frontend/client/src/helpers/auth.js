import {setCookie, getCookie, deleteCookie} from "./cookies";
import {setLocalStorage, getLocalStorage, deleteLocalStorage} from "./localStorage";

export const setUserRole = (role) => {
    setLocalStorage('userRole', role);
};

export const getUserRole = () => {
    return getLocalStorage('userRole');
};


export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
    setUserRole(user.userrole); // Assuming user.userrole contains the user's role
}

export const isAuthenticated = () => {
    if(getCookie('token') && getLocalStorage('user')) {
        return getLocalStorage('user');
    } else{
        return false;
    }
};

export const logout = next => {
    deleteCookie('token');
    deleteLocalStorage('user');
    deleteLocalStorage('userId');
    deleteLocalStorage('userRole');
    deleteLocalStorage('userName');
  
    next();
}