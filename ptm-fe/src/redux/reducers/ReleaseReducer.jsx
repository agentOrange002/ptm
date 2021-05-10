import { RELEASE_ERROR, RELEASE_GET_ALL, RELEASE_GET_BY_ID, RELEASE_SAVE, RELEASE_UPDATE, RELEASE_DELETE, RELEASE_RESET } from '../constants/ReleaseConstants';
import _ from 'lodash';

const ReleasesState = {
	releasesResponse: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const RELEASES = (state = ReleasesState, action) => {
	switch (action.type) {
		case RELEASE_RESET:
			return {
				...state,
				releasesResponse: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RELEASE_GET_ALL:
			return {
				...state,
				releasesResponse: _.mapKeys(action.payload, 'releaseId'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RELEASE_GET_BY_ID:
			return {
				...state,
				releasesResponse: { ...state.releasesResponse, [action.payload.releaseId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RELEASE_SAVE:
			return {
				...state,
				releasesResponse: { ...state.releasesResponse, [action.payload.releaseId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RELEASE_UPDATE:
			return {
				...state,
				releasesResponse: { ...state.releasesResponse, [action.payload.releaseId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RELEASE_DELETE:
			return {
				...state,
				releasesResponse: _.omit(state.releasesResponse, action.payload.releaseId),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RELEASE_ERROR:
			return {
				...state,
				releasesResponse: { ...state.releasesResponse },
				fetchType: action.type,
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		default:
			return state;
	}
};
