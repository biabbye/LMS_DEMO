import { GET_GROUPS,CREATE_GROUPS } from "../constants/groupConstans";

const INITIAL_STATE = {
    groups: []
}

const groupReducers = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case GET_GROUPS:
            return{
                ...state,
                groups: action.payload
            }
        case CREATE_GROUPS:
            return {
                ...state,
                groups: [...state.groups,action.payload]
            }
        default:
            return state
    }
}

export default groupReducers;