import {
    CATEGORY_ERROR,
    CATEGORY_GET_ALL,
    CATEGORY_GET_BY_ID,   
    CATEGORY_SAVE,
    CATEGORY_UPDATE,
    CATEGORY_DELETE,
    CATEGORY_RESET
} from '../constants/CategoryConstants';
import _ from 'lodash';

const CategorysState = {
    categoriesResponse: [],
    fetchType: null,
    fetchError: false,
    fetchErrorMessage: null
};

export const CATEGORIES = (state = CategorysState, action) => {
    switch (action.type) {
        case CATEGORY_RESET:
            return {
                ...state,
                categoriesResponse: [],
                fetchType: null,
                fetchError: false,
                fetchErrorMessage: null
            };
        case CATEGORY_GET_ALL:
            return {
                ...state,
                categoriesResponse: _.mapKeys(action.payload, 'categoryId'),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };        
        case CATEGORY_GET_BY_ID:
            return {
                ...state,
                categoriesResponse: { ...state.categoriesResponse, [action.payload.categoryId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case CATEGORY_SAVE:
            return {
                ...state,
                categoriesResponse: { ...state.categoriesResponse, [action.payload.categoryId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case CATEGORY_UPDATE:
            return {
                ...state,
                categoriesResponse: { ...state.categoriesResponse, [action.payload.categoryId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case CATEGORY_DELETE:
            return {
                ...state,
                categoriesResponse: _.omit(state.categoriesResponse, action.payload.categoryId),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case CATEGORY_ERROR:
            return {
                ...state,
                categoriesResponse: { ...state.categoriesResponse },
                fetchType: action.type,
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



