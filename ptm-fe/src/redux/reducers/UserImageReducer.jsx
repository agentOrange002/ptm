import {
    USER_IMAGE_GET,
    USER_IMAGE_SUBMIT,
    USER_IMAGE_ERROR,
    USER_IMAGE_RESET,
    USER_IMAGE_UPDATE
} from '../constants/UsersConstants';

const userImageState = {
    userimageResponse: [],
    fetchType: null,
    fetchError: false,
    fetchErrorMessage: null
};

export const USERIMAGE = (state = userImageState, action) => {
    switch (action.type) {
        case USER_IMAGE_RESET:
            return {
                ...state,
                userimageResponse: [],
                fetchType: null,
                fetchError: false,
                fetchErrorMessage: null
            };
        case USER_IMAGE_GET:
            return {
                ...state,
                userimageResponse: action.payload,
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case USER_IMAGE_SUBMIT:
            return {
                ...state,
                userimageResponse: action.payload,
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case USER_IMAGE_UPDATE:
            return {
                ...state,
                userimageResponse: action.payload,
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case USER_IMAGE_ERROR:
            return {
                ...state,
                userimageResponse: { ...state.userimageResponse },
                fetchType: action.type,
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
}