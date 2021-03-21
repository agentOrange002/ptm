import {
    MEMBERADDRESS_ERROR,
    MEMBERADDRESS_GET_ALL,
    MEMBERADDRESS_GET_BY_ADDRESSID,
    MEMBERADDRESS_GET_BY_MEMBER,
    MEMBERADDRESS_SAVE,
    MEMBERADDRESS_UPDATE,
    MEMBERADDRESS_DELETE,
    MEMBERADDRESS_RESET,
    MEMBERADDRESS_CLEAR,
    MEMBERADDRESS_GET_ALL_BY_MEMBERID,
} from '../constants/MemberAddressConstants';
import _ from 'lodash';

const MemberAddressesState = {
    memberaddressesResponse: [],
    fetchType: null,
    fetchError: false,
    fetchErrorMessage: null
};

export const MEMBERADDRESSES = (state = MemberAddressesState, action) => {
    switch (action.type) {
        case MEMBERADDRESS_RESET:
            return {
                ...state,
                memberaddressesResponse: [],
                fetchType: null,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBERADDRESS_GET_ALL:
            return {
                ...state,
                memberaddressesResponse: _.mapKeys(action.payload, 'addressId'),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case MEMBERADDRESS_GET_BY_MEMBER:
            return {
                ...state,
                memberaddressesResponse: { ...state.memberaddressesResponse, [action.payload.addressId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case MEMBERADDRESS_GET_BY_ADDRESSID:
            return {
                ...state,
                memberaddressesResponse: { ...state.memberaddressesResponse, [action.payload.addressId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case MEMBERADDRESS_SAVE:
            return {
                ...state,
                memberaddressesResponse: { ...state.memberaddressesResponse, [action.payload.addressId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case MEMBERADDRESS_UPDATE:
            return {
                ...state,
                memberaddressesResponse: { ...state.memberaddressesResponse, [action.payload.addressId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null

            };
        case MEMBERADDRESS_DELETE:
            return {
                ...state,
                memberaddressesResponse: _.omit(state.memberaddressesResponse, action.payload.addressId),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBERADDRESS_ERROR:
            return {
                ...state,
                memberaddressesResponse: { ...state.memberaddressesResponse },
                fetchType: action.type,
                fetchError: true,
                fetchErrorMessage: action.error
            };
        case MEMBERADDRESS_CLEAR:
            return {
                ...state,
                memberaddressesResponse: { ...state.memberaddressesResponse },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBERADDRESS_GET_ALL_BY_MEMBERID:
            return {
                ...state,
                memberaddressesResponse: _.mapKeys(action.payload, 'addressId'),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null    
                };
        default:
            return state;
    }
};



