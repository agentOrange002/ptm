import { boardURL as apiURL } from '../config/ConfigURL';
import {
	BoardError,
	BoardSave,
	BoardLoading,
	BoardReset,
	BoardGetAll,	
	BoardPayout,
	//BoardPayout2,
	//BoardSave2,
	//BoardGetAllByBoardID,
	//BoardGetByID
} from '../constants/BoardConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastInfo, ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const getAllBoards = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(BoardReset());
	dispatch(BoardLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	await apiURL
		.get('/', {
			headers: {
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(BoardGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(BoardError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getAllBoardsByBoardId = boardId => async (dispatch, getState) => {
	dispatch(BoardLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/all/board/${boardId}`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(BoardGetAllByBoardId(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(BoardError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveBoard = formValues => async (dispatch, getState) => {
	dispatch(BoardLoading());
	let uid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.post('/', {...formValues, "loggedBy":uid}, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(BoardSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addNewBoard'));
			ToastSuccess('Successfully Save New Board!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(BoardError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const boardPayout = boardId => async (dispatch, getState) => {
	dispatch(BoardLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.post(`/payout`, {"boardId":boardId},{
			headers: {
				'Content-type': 'application/json',
				'Accept': 'application/json',				
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(BoardPayout(data));
			dispatch(hideLoading('LOADINGBAR'));
			ToastInfo('Board has successfully payout!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(BoardError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

