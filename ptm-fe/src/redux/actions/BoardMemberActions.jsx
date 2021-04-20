import { boardmemberURL as apiURL } from '../config/ConfigURL';
import { BoardMemberError, BoardMemberSave, BoardMemberLoading, BoardMemberReset, BoardMemberGetAll, BoardMemberGetAllByBoardID, BoardMemberSave1 } from '../constants/BoardMemberConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const getAllBoardMembers = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(BoardMemberReset());
	dispatch(BoardMemberLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	await apiURL
		.get('/all', {
			headers: {
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(BoardMemberGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(BoardMemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getAllBoardMembersByBoardId = (boardId) => async (dispatch, getState) => {
	dispatch(BoardMemberLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/board/${boardId}`, {
			headers: {
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(BoardMemberGetAllByBoardID(data));
			dispatch(hideLoading('LOADINGBAR'));
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(BoardMemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveBoardMember = (formValues) => async (dispatch, getState) => {
	dispatch(BoardMemberLoading());
	let uid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.post(
			'/',
			{ ...formValues, loggedBy: uid },
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: token,
				},
			}
		)
		.then(function (response) {
			let data = response.data;
			dispatch(BoardMemberSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addNewBoardMember'));
			ToastSuccess('Successfully Save New BoardMember!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(BoardMemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const save1_auto = (formValues, boardMemberId) => async (dispatch, getState) => {
	dispatch(BoardMemberLoading());
	dispatch(showLoading('LOADINGBAR'));
	const { memberId } = formValues;
	let userId = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	await apiURL
		.put(`/save1put/${boardMemberId}/${userId}`, formValues, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(BoardMemberSave1(data));
			dispatch(hideLoading('LOADINGBAR'));
			ToastSuccess('Successfully Apply BoardMember!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(BoardMemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};
