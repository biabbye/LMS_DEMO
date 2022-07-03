import axios from 'axios';

export const createGroup = async ( formData) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const response = await axios.post('/api/group', formData,config);

    return response;
}

export const getGroups = async () => {
    
    const response = await axios.get('/api/group');

    return response;
}