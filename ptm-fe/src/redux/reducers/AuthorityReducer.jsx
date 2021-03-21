import { AUTHORITY_GET_ALL_BY_ROLE ,AUTHORITY_ERROR, AUTHORITY_GET_ALL, AUTHORITY_GET_BY_ID, AUTHORITIES_SYSTEM_USERID, AUTHORITY_SAVE, AUTHORITY_UPDATE, AUTHORITY_DELETE, AUTHORITY_RESET } from '../constants/AuthorityConstants';
import _ from 'lodash';

const AuthoritiesState = {
	authoritiesResponse: [],
	userAuthorities: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const AUTHORITIES = (state = AuthoritiesState, action) => {
	switch (action.type) {
		case AUTHORITY_RESET:
			return {
				...state,
				authoritiesResponse: [],
				userAuthorities: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case AUTHORITY_GET_ALL:
			return {
				...state,
				authoritiesResponse: _.mapKeys(action.payload, 'id'),
				userAuthorities: { ...state.userAuthorities },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case AUTHORITY_GET_ALL_BY_ROLE:
			return {
				...state,
				authoritiesResponse: _.mapKeys(action.payload, 'id'),
				userAuthorities: { ...state.userAuthorities },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case AUTHORITIES_SYSTEM_USERID:
			return {
				...state,
				authoritiesResponse: { ...state.authoritiesResponse },
				userAuthorities: _.mapKeys(action.payload, 'id'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case AUTHORITY_GET_BY_ID:
			return {
				...state,
				authoritiesResponse: { ...state.authoritiesResponse, [action.payload.id]: action.payload },
				userAuthorities: { ...state.userAuthorities },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case AUTHORITY_SAVE:
			return {
				...state,
				authoritiesResponse: { ...state.authoritiesResponse, [action.payload.id]: action.payload },
				userAuthorities: { ...state.userAuthorities },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case AUTHORITY_UPDATE:
			return {
				...state,
				authoritiesResponse: { ...state.authoritiesResponse, [action.payload.id]: action.payload },
				userAuthorities: { ...state.userAuthorities },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case AUTHORITY_DELETE:
			return {
				...state,
				authoritiesResponse: _.omit(state.authoritiesResponse, action.payload.id),
				userAuthorities: { ...state.userAuthorities },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case AUTHORITY_ERROR:
			return {
				...state,
				authoritiesResponse: { ...state.authoritiesResponse },
				userAuthorities: { ...state.userAuthorities },
				fetchType: action.type,
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		default:
			return state;
	}
};
