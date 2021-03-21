import {   
    BOARDMEMBER_GET_ALL_BY_BOARDID,
    BOARDMEMBER_GET_ALL,
    BOARDMEMBER_GET_BY_ID,
    BOARDMEMBER_SAVE,
    BOARDMEMBER_UPDATE,
    BOARDMEMBER_DELETE,
    BOARDMEMBER_ERROR,
    BOARDMEMBER_RESET,
    BOARDMEMBER_SAVE1,
} from '../constants/BoardMemberConstants';
import _ from 'lodash';

const BoardMembersState = {
    boardMembersResponse: [],
	fetchType: null,
    fetchError: false,
    fetchErrorMessage: null
};

export const BOARDMEMBERS = (state = BoardMembersState, action) => {
    switch (action.type) {
			case BOARDMEMBER_RESET:
				return {
					...state,
					boardMembersResponse: [],					
					fetchType: null,
					fetchError: false,
					fetchErrorMessage: null,
				};
			case BOARDMEMBER_GET_ALL:
				return {
					...state,
					boardMembersResponse: _.mapKeys(action.payload, 'boardMemberId'),
					fetchType: action.type,
					fetchError: false,
					fetchErrorMessage: null,
				};
			case BOARDMEMBER_GET_ALL_BY_BOARDID:
				return {
					...state,
					boardMembersResponse: _.mapKeys(action.payload, 'boardMemberId'),
					fetchType: action.type,
					fetchError: false,
					fetchErrorMessage: null,
				};
			case BOARDMEMBER_GET_BY_ID:
				return {
					...state,
					boardMembersResponse: { ...state.boardMembersResponse, [action.payload.boardMemberId]: action.payload },
					fetchType: action.type,
					fetchError: false,
					fetchErrorMessage: null,
				};
			case BOARDMEMBER_SAVE:
				return {
					...state,
					boardMembersResponse: { ...state.boardMembersResponse, [action.payload.boardMemberId]: action.payload },
					fetchType: action.type,
					fetchError: false,
					fetchErrorMessage: null,
				};
			case BOARDMEMBER_UPDATE:
				return {
					...state,
					boardMembersResponse: { ...state.boardMembersResponse, [action.payload.boardMemberId]: action.payload },
					fetchType: action.type,
					fetchError: false,
					fetchErrorMessage: null,
				};
			case BOARDMEMBER_DELETE:
				return {
					...state,
					boardMembersResponse: _.omit(state.boardMembersResponse, action.payload.boardMemberId),
					fetchType: action.type,
					fetchError: false,
					fetchErrorMessage: null,
				};
			case BOARDMEMBER_SAVE1:
				return {
					...state,
					boardMembersResponse: { ...state.boardMembersResponse, [action.payload.boardMemberId]: action.payload },
					fetchType: action.type,
					fetchError: false,
					fetchErrorMessage: null,
				};
			case BOARDMEMBER_ERROR:
				return {
					...state,
					boardMembersResponse: { ...state.boardMembersResponse },
					fetchType: action.type,
					fetchError: true,
					fetchErrorMessage: action.error,
				};
			default:
				return state;
		}
};



