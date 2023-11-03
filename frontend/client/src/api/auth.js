import axios from 'axios';

export const signup = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await axios.post('/api/auth/signup', data, config);
    return response;
};

export const login = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await axios.post('/api/auth/login', data, config);
    return response;
};

export const checkExist = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await axios.post('/api/auth/checkExist', data, config);
    return response;
};


export const sendEmail = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await axios.post('/api/auth/sendEmail', data, config);
    return response;
};

export const updatePassword = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await axios.post('/api/auth/updatePw', data, config);
    return response;
};