import axios from 'axios';

export const Register = async (data) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json',

        }
    };

    const response = await axios.post('/api/auth/register',data,config);
    return response;
};

export const Login = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await axios.post('/api/auth/login', data, config);
    return response;
};