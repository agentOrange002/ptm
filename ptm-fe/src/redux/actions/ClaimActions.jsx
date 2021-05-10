import { claimURL as apiURL } from '../config/ConfigURL';
import { ClaimError, ClaimSave, ClaimLoading, ClaimReset, ClaimGetAll, ClaimGetByClaimID } from '../constants/ClaimConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastInfo, ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const getAllClaims = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(ClaimReset());
	dispatch(ClaimLoading());
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
			dispatch(ClaimGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(ClaimError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getClaimByClaimId = (claimId) => async (dispatch, getState) => {
	dispatch(ClaimLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/${claimId}`, {
			headers: {
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(ClaimGetByClaimID(data));
			dispatch(hideLoading('LOADINGBAR'));
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(ClaimError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveClaim = (formValues) => async (dispatch, getState) => {
	dispatch(ClaimLoading());
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
			dispatch(ClaimSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addNewClaim'));
			ToastSuccess('Successfully Save New Claim!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(ClaimError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};
