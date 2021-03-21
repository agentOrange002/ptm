import _ from 'lodash';
import { USER_ERROR, USER_GET_ALL, USER_GET_BY_ID, USER_SAVE, USER_UPDATE, USER_DELETE, USER_RESET, USER_APPLY_ROLE } from '../constants/UsersConstants';

const UsersState = {
	usersResponse: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const USERS = (state = UsersState, action) => {
	switch (action.type) {
		case USER_RESET:
			return {
				...state,
				usersResponse: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case USER_GET_ALL:
			return {
				...state,
				usersResponse: _.mapKeys(action.payload, 'userId'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case USER_GET_BY_ID:
			return {
				...state,
				usersResponse: { ...state.usersResponse, [action.payload.userId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case USER_SAVE:
			return {
				...state,
				usersResponse: { ...state.usersResponse, [action.payload.userId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case USER_UPDATE:
			return {
				...state,
				usersResponse: { ...state.usersResponse, [action.payload.userId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case USER_APPLY_ROLE:
			return {
				...state,
				usersResponse: { ...state.usersResponse, [action.payload.userId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case USER_DELETE:
			return {
				...state,
				usersResponse: _.omit(state.usersResponse, action.payload.userId),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};

		case USER_ERROR:
			return {
				...state,
				usersResponse: { ...state.usersResponse },
				fetchType: action.type,
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		default:
			return state;
	}
};
