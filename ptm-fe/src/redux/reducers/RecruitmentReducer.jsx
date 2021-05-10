import { RECRUITMENT_ERROR, RECRUITMENT_GET_ALL, RECRUITMENT_GET_BY_ID, RECRUITMENT_SAVE, RECRUITMENT_UPDATE, RECRUITMENT_DELETE, RECRUITMENT_RESET } from '../constants/RecruitmentConstants';
import _ from 'lodash';

const RecruitmentsState = {
	recruitmentsResponse: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const RECRUITMENTS = (state = RecruitmentsState, action) => {
	switch (action.type) {
		case RECRUITMENT_RESET:
			return {
				...state,
				recruitmentsResponse: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RECRUITMENT_GET_ALL:
			return {
				...state,
				recruitmentsResponse: _.mapKeys(action.payload, 'recruitmentId'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RECRUITMENT_GET_BY_ID:
			return {
				...state,
				recruitmentsResponse: { ...state.recruitmentsResponse, [action.payload.recruitmentId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RECRUITMENT_SAVE:
			return {
				...state,
				recruitmentsResponse: { ...state.recruitmentsResponse, [action.payload.recruitmentId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RECRUITMENT_UPDATE:
			return {
				...state,
				recruitmentsResponse: { ...state.recruitmentsResponse, [action.payload.recruitmentId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RECRUITMENT_DELETE:
			return {
				...state,
				recruitmentsResponse: _.omit(state.recruitmentsResponse, action.payload.recruitmentId),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case RECRUITMENT_ERROR:
			return {
				...state,
				recruitmentsResponse: { ...state.recruitmentsResponse },
				fetchType: action.type,
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		default:
			return state;
	}
};
