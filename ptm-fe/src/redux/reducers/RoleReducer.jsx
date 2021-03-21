import { ROLE_GET_ALL_BY_USERID, ROLE_ERROR, ROLE_CLEAR, ROLE_GET_ALL, ROLE_GET_BY_ID, ROLE_SAVE, ROLE_UPDATE, ROLE_DELETE, ROLE_RESET, ROLE_APPLY_AUTHORITIES } from '../constants/RoleConstants';
import _ from 'lodash';

const RolesState = {
	rolesResponse: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const ROLES = (state = RolesState, action) => {
	switch (action.type) {
		case ROLE_RESET:
			return {
				...state,
				rolesResponse: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_GET_ALL:
			return {
				...state,
				rolesResponse: _.mapKeys(action.payload, 'id'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_GET_ALL_BY_USERID:
			return {
				...state,
				rolesResponse: _.mapKeys(action.payload, 'id'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_GET_BY_ID:
			return {
				...state,
				rolesResponse: { ...state.rolesResponse, [action.payload.id]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_SAVE:
			return {
				...state,
				rolesResponse: { ...state.rolesResponse, [action.payload.id]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_UPDATE:
			return {
				...state,
				rolesResponse: { ...state.rolesResponse, [action.payload.id]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_APPLY_AUTHORITIES:
			return {
				...state,
				rolesResponse: { ...state.rolesResponse, [action.payload.id]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_DELETE:
			return {
				...state,
				rolesResponse: _.omit(state.rolesResponse, action.payload.id),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_CLEAR:
			return {
				...state,
				rolesResponse: { ...state.rolesResponse },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case ROLE_ERROR:
			return {
				...state,
				rolesResponse: { ...state.rolesResponse },
				fetchType: action.type,
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		default:
			return state;
	}
};
