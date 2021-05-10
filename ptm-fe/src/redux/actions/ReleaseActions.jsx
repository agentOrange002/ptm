import { releaseURL as apiURL } from '../config/ConfigURL';
import { ReleaseError, ReleaseSave, ReleaseLoading, ReleaseReset, ReleaseGetAll, ReleaseGetByReleaseID } from '../constants/ReleaseConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastInfo, ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const getAllReleases = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(ReleaseReset());
	dispatch(ReleaseLoading());
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
			dispatch(ReleaseGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(ReleaseError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getReleaseByReleaseId = (releaseId) => async (dispatch, getState) => {
	dispatch(ReleaseLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/${releaseId}`, {
			headers: {
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(ReleaseGetByReleaseID(data));
			dispatch(hideLoading('LOADINGBAR'));
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(ReleaseError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveRelease = (formValues) => async (dispatch, getState) => {
	dispatch(ReleaseLoading());
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
			dispatch(ReleaseSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addNewRelease'));
			ToastSuccess('Successfully Save New Release!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(ReleaseError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};
