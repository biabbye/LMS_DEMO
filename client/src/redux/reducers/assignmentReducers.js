import {CREATE_ASSIGNMENT,GET_ASSIGNMENTS,GET_ASSIGNMENT, DELETE_ASSIGNMENT} from '../constants/assignmentConstants'

const INITIAL_STATE = {
    assignments: [],
};

const assignmentReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_ASSIGNMENT:
            return {
                assignments: [...state.assignments, action.payload],
            };
        case GET_ASSIGNMENTS:
            return {
                assignments: [...action.payload],
            };
        case GET_ASSIGNMENT:
            return {
                assignment: action.payload,
            };
        case DELETE_ASSIGNMENT:
            return {
                assignments: state.assignments.filter( a => a._id !== action.payload._id),
            };
        
        default:
            return state;
    }
};

export default assignmentReducer;