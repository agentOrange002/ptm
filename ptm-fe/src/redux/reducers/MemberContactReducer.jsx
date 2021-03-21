import {
	MEMBERCONTACT_ERROR,
	MEMBERCONTACT_GET_ALL,
	MEMBERCONTACT_GET_BY_CONTACTID,
	MEMBERCONTACT_GET_BY_MEMBER,
	MEMBERCONTACT_SAVE,
	MEMBERCONTACT_UPDATE,
	MEMBERCONTACT_DELETE,
	MEMBERCONTACT_RESET,
	MEMBERCONTACT_GET_ALL_BY_MEMBERID,
	MEMBERCONTACT_CLEAR,
} from '../constants/MemberContactConstants';
import _ from 'lodash';

const MemberContactsState = {
	membercontactsResponse: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const MEMBERCONTACTS = (state = MemberContactsState, action) => {
	switch (action.type) {
		case MEMBERCONTACT_RESET:
			return {
				...state,
				membercontactsResponse: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case MEMBERCONTACT_GET_ALL:
			return {
				...state,
				membercontactsResponse: _.mapKeys(action.payload, 'contactId'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case MEMBERCONTACT_GET_BY_MEMBER:
			return {
				...state,
				membercontactsResponse: { ...state.membercontactsResponse, [action.payload.contactId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case MEMBERCONTACT_GET_BY_CONTACTID:
			return {
				...state,
				membercontactsResponse: { ...state.membercontactsResponse, [action.payload.contactId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case MEMBERCONTACT_SAVE:
			return {
				...state,
				membercontactsResponse: { ...state.membercontactsResponse, [action.payload.contactId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case MEMBERCONTACT_UPDATE:
			return {
				...state,
				membercontactsResponse: { ...state.membercontactsResponse, [action.payload.contactId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case MEMBERCONTACT_DELETE:
			return {
				...state,
				membercontactsResponse: _.omit(state.membercontactsResponse, action.payload.contactId),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case MEMBERCONTACT_CLEAR:
			return {
				...state,
				membercontactsResponse: { ...state.membercontactsResponse },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case MEMBERCONTACT_ERROR:
			return {
				...state,
				membercontactsResponse: { ...state.membercontactsResponse },
				fetchType: action.type,
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		case MEMBERCONTACT_GET_ALL_BY_MEMBERID:
			return {
				...state,
				membercontactsResponse: _.mapKeys(action.payload, 'contactId'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		default:
			return state;
	}
};
