import {
    USER_SIGNUP,
    USER_SIGNUP_ERROR,
    USER_SIGNUP_RESET,  
} from '../constants/PublicConstants';

const usersState = {
    usersResponse: [],
    fetchError: false,
    fetchErrorMessage: null
};

export const PUBLICUSERSIGNUP = (state = { usersState }, action) => {
    switch (action.type) {  
        case USER_SIGNUP_RESET:
            return {
                ...state,
                usersState: {
                    usersResponse: [],                
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case USER_SIGNUP:
            return {
                ...state,
                usersState: {
                    usersResponse: action.payload,                  
                    fetchError: false,
                    fetchErrorMessage: null
                }
            };
        case USER_SIGNUP_ERROR:
            return {
                ...state,
                usersState: {
                    usersResponse: [],                  
                    fetchError: true,
                    fetchErrorMessage: action.error
                }
            };
        default:
            return state;
    }
};

