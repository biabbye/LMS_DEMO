import axios from 'axios';

export const createAssignment = async(formData) => {
    
    
    const response = await axios.post('/api/assignment', formData);
    
    return response;
}