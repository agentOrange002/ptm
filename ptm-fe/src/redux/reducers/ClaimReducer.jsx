import { CLAIM_ERROR, CLAIM_GET_ALL, CLAIM_GET_BY_ID, CLAIM_SAVE, CLAIM_UPDATE, CLAIM_DELETE, CLAIM_RESET } from '../constants/ClaimConstants';
import _ from 'lodash';

const ClaimsState = {
	claimsResponse: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const CLAIMS = (state = ClaimsState, action) => {
	switch (action.type) {
		case CLAIM_RESET:
			return {
				...state,
				claimsResponse: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case CLAIM_GET_ALL:
			return {
				...state,
				claimsResponse: _.mapKeys(action.payload, 'claimId'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case CLAIM_GET_BY_ID:
			return {
				...state,
				claimsResponse: { ...state.claimsResponse, [action.payload.claimId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case CLAIM_SAVE:
			return {
				...state,
				claimsResponse: { ...state.claimsResponse, [action.payload.claimId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case CLAIM_UPDATE:
			return {
				...state,
				claimsResponse: { ...state.claimsResponse, [action.payload.claimId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case CLAIM_DELETE:
			return {
				...state,
				claimsResponse: _.omit(state.claimsResponse, action.payload.claimId),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case CLAIM_ERROR:
			return {
				...state,
				claimsResponse: { ...state.claimsResponse },
				fetchType: action.type,
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		default:
			return state;
	}
};
