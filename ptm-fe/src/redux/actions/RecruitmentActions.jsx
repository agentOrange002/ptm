import { recruitmentURL as apiURL } from '../config/ConfigURL';
import { RecruitmentError, RecruitmentSave, RecruitmentLoading, RecruitmentReset, RecruitmentGetAll, RecruitmentGetByRecruitmentID, RecruitmentApplyMember } from '../constants/RecruitmentConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastSuccess, ToastError } from '../../components/toasts';
import _ from 'lodash';

export const getAllRecruitments = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(RecruitmentReset());
	dispatch(RecruitmentLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	await apiURL
		.get('/', {
			headers: {
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(RecruitmentGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RecruitmentError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getRecruitmentByRecruitmentId = (recruitmentId) => async (dispatch, getState) => {
	dispatch(RecruitmentLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/${recruitmentId}`, {
			headers: {
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(RecruitmentGetByRecruitmentID(data));
			dispatch(hideLoading('LOADINGBAR'));
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RecruitmentError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveRecruitment = (memberId, members) => async (dispatch, getState) => {
	dispatch(RecruitmentLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.post(`/save/${memberId}`, members, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(RecruitmentSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			ToastSuccess('Successfully Save New Recruitment!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RecruitmentError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const applyRecruitedMembers = (recruitmentId, members) => async (dispatch, getState) => {
	dispatch(RecruitmentLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.put(`/applymembers/${recruitmentId}`, members, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(RecruitmentApplyMember(data));
			dispatch(hideLoading('LOADINGBAR'));
			ToastSuccess('Successfully Save New Recruited Members!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RecruitmentError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};
