import {
    ADDRESS_ERROR,
    ADDRESS_GET_ALL,
    ADDRESS_GET_BY_ID,
    ADDRESS_GET_BY_USERID,
    ADDRESS_SAVE,
    ADDRESS_UPDATE,
    ADDRESS_DELETE,
    ADDRESS_RESET
} from '../constants/AddressConstants';
import _ from 'lodash';

const AddressesState = {
    addressesResponse: [],
    fetchType: null,
    fetchError: false,
    fetchErrorMessage: null
};

export const ADDRESSES = (state = AddressesState, action) => {
    switch (action.type) {
        case ADDRESS_RESET:
            return {
                ...state,
                addressesResponse: [],
                fetchType: null,
                fetchError: false,
                fetchErrorMessage: null
            };
        case ADDRESS_GET_ALL:
            return {
                ...state,
                addressesResponse: _.mapKeys(action.payload, 'addressId'),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case ADDRESS_GET_BY_USERID:
            return {
                ...state,
                addressesResponse: { ...state.addressesResponse, [action.payload.addressId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case ADDRESS_GET_BY_ID:
            return {
                ...state,
                addressesResponse: { ...state.addressesResponse, [action.payload.addressId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case ADDRESS_SAVE:
            return {
                ...state,
                addressesResponse: { ...state.addressesResponse, [action.payload.addressId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case ADDRESS_UPDATE:
            return {
                ...state,
                addressesResponse: { ...state.addressesResponse, [action.payload.addressId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case ADDRESS_DELETE:
            return {
                ...state,
                addressesResponse: _.omit(state.addressesResponse, action.payload.addressId),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case ADDRESS_ERROR:
            return {
                ...state,
                addressesResponse: { ...state.addressesResponse },
                fetchType: action.type,
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



