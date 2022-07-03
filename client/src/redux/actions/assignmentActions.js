import axios from "axios";

import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants/messageConstants";
import { CREATE_ASSIGNMENT,GET_ASSIGNMENTS,GET_ASSIGNMENT, DELETE_ASSIGNMENT} from "../constants/assignmentConstants";

export const createAssignment = formData => async dispatch => {
    try {
        dispatch({type:START_LOADING})
        const response = await axios.post('/api/assignment', formData);
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload: response.data.successMessage})
        dispatch({
			type: CREATE_ASSIGNMENT,
			payload: response.data.newAssignment,
		});
    } catch (error) {
        console.log('createAssignment api error:', error);
        dispatch({type:STOP_LOADING});
        dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage})
    }
}

export const getAssignments = () => async dispatch => {
    try {
        dispatch({type:START_LOADING})
        const response = await axios.get('/api/assignment');
        dispatch({type:STOP_LOADING})
        dispatch({type:GET_ASSIGNMENTS,payload: response.data.assignments})
        return response;
    } catch (error) {
        console.log('getAssignments api error:', error);
        dispatch({type:STOP_LOADING});
        dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage})
    }
}

export const getAssignment = assignmentId => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.get(`api/assignment/${assignmentId}`);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: GET_ASSIGNMENT,
			payload: response.data,
		});
	} catch (err) {
		console.log('getAssignment api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};

export const deleteAssignment = assignmentId => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.delete(`api/assignment/delete/${assignmentId}`);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: DELETE_ASSIGNMENT,
			payload: response.data,
		});
	} catch (err) {
		console.log('deleteAssignment api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};