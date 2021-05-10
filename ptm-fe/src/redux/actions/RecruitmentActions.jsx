import { recruitmentURL as apiURL } from '../config/ConfigURL';
import { RecruitmentError, RecruitmentSave, RecruitmentLoading, RecruitmentReset, RecruitmentGetAll, RecruitmentGetByRecruitmentID } from '../constants/RecruitmentConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
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

export const saveRecruitment = (formValues) => async (dispatch, getState) => {
	dispatch(RecruitmentLoading());
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
			dispatch(RecruitmentSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addNewRecruitment'));
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
