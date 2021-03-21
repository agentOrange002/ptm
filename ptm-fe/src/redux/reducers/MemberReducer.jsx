import {   
    MEMBER_GET_ALL_BY_TEAMID,
    MEMBER_GET_ALL,
    MEMBER_GET_BY_ID,
    MEMBER_SAVE,
    MEMBER_UPDATE,
    MEMBER_DELETE,
    MEMBER_ERROR,
    MEMBER_RESET,
} from '../constants/MemberConstants';
import _ from 'lodash';

const MembersState = {
    membersResponse: [],
    fetchType: null,
    fetchError: false,
    fetchErrorMessage: null
};

export const MEMBERS = (state = MembersState, action) => {
    switch (action.type) {
        case MEMBER_RESET:
            return {
                ...state,
                membersResponse: [],
                fetchType: null,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBER_GET_ALL:
            return {
                ...state,
                membersResponse: _.mapKeys(action.payload, 'memberId'),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBER_GET_ALL_BY_TEAMID:
            return {
                ...state,
                membersResponse: _.mapKeys(action.payload, 'memberId'),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };     
        case MEMBER_GET_BY_ID:
            return {
                ...state,
                membersResponse: { ...state.membersResponse, [action.payload.memberId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBER_SAVE:
            return {
                ...state,
                membersResponse: { ...state.membersResponse, [action.payload.memberId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBER_UPDATE:
            return {
                ...state,
                membersResponse: { ...state.membersResponse, [action.payload.memberId]: action.payload },
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBER_DELETE:
            return {
                ...state,
                membersResponse: _.omit(state.membersResponse, action.payload.memberId),
                fetchType: action.type,
                fetchError: false,
                fetchErrorMessage: null
            };
        case MEMBER_ERROR:
            return {
                ...state,
                membersResponse: { ...state.membersResponse },
                fetchType: action.type,
                fetchError: true,
                fetchErrorMessage: action.error
            };
        default:
            return state;
    }
};



