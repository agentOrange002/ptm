import {
	BOARD_GET_ALL_BY_BOARDID,
	BOARD_GET_ALL,
	BOARD_GET_BY_ID,
	BOARD_SAVE,
	BOARD_UPDATE,
	BOARD_DELETE,
	BOARD_ERROR,
	BOARD_RESET,
	BOARD_PAYOUT,
} from '../constants/BoardConstants';
import _ from 'lodash';

const BoardsState = {
	boardsResponse: [],
	fetchType: null,
	fetchError: false,
	fetchErrorMessage: null,
};

export const BOARDS = (state = BoardsState, action) => {
	switch (action.type) {
		case BOARD_RESET:
			return {
				...state,
				boardsResponse: [],
				fetchType: null,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case BOARD_GET_ALL:
			return {
				...state,
				boardsResponse: _.mapKeys(action.payload, 'boardId'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case BOARD_GET_ALL_BY_BOARDID:
			return {
				...state,
				boardsResponse: _.mapKeys(action.payload, 'boardId'),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case BOARD_GET_BY_ID:
			return {
				...state,
				boardsResponse: { ...state.boardsResponse, [action.payload.boardId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case BOARD_SAVE:
			return {
				...state,
				boardsResponse: { ...state.boardsResponse, [action.payload.boardId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case BOARD_UPDATE:
			return {
				...state,
				boardsResponse: { ...state.boardsResponse, [action.payload.boardId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};
		case BOARD_DELETE:
			return {
				...state,
				boardsResponse: _.omit(state.boardsResponse, action.payload.boardId),
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};		
		case BOARD_PAYOUT:
			return {
				...state,
				boardsResponse: { ...state.boardsResponse, [action.payload.boardId]: action.payload },
				fetchType: action.type,
				fetchError: false,
				fetchErrorMessage: null,
			};	
		case BOARD_ERROR:
			return {
				...state,
				boardsResponse: { ...state.boardsResponse },
				fetchType: action.type,
				fetchError: true,
				fetchErrorMessage: action.error,
			};
		default:
			return state;
	}
};
