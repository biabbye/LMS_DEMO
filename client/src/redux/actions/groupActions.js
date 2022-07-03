import { GET_GROUPS, CREATE_GROUPS } from "../constants/groupConstans";
import { START_LOADING,STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants/messageConstants";
import axios from 'axios'

export const createGroup = formData => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        dispatch({ type: START_LOADING});
        const response = await axios.post('/api/group', formData,config);
        dispatch({ type: STOP_LOADING});
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload:response.data.successMessage})
        dispatch({type:CREATE_GROUPS, payload: response.data.group})
        
    } catch (error) {
        console.log('CreateGroup api error:', error);
        dispatch({type:STOP_LOADING});
        dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage})
    }
}

export const getGroups = () =>async dispatch => {

    try {

        dispatch({ type: START_LOADING});
        const response = await axios.get('/api/group');

        dispatch({type:STOP_LOADING});

        dispatch({type:GET_GROUPS, payload: response.data.groups})
      
    } catch (error) {
        console.log('getCategories api error:', error);
        dispatch({type:STOP_LOADING});
        dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage})
    }
    
    
}