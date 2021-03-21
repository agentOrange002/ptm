import { roleURL as apiURL } from '../config/ConfigURL';
import { RoleError, RoleSave, RoleLoading, RoleReset, RoleGetAll, RoleGetByRoleID, RoleApplyAuthorities, RoleClear, RoleGetAllByUserId } from '../constants/RoleConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastInfo, ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const roleClear = () => async (dispatch) => {
	dispatch(RoleClear());
};

export const getAllRoles = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(RoleReset());
	dispatch(RoleLoading());
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
			dispatch(RoleGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));
			ToastInfo('All Role has been loaded.');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RoleError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getRoleByRoleId = (roleId) => async (dispatch, getState) => {
	dispatch(RoleLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/${roleId}`, {
			headers: {
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(RoleGetByRoleID(data));
			dispatch(hideLoading('LOADINGBAR'));
			ToastInfo('All Role has been loaded.');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RoleError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveRole = (formValues) => async (dispatch, getState) => {
	dispatch(RoleLoading());
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
			dispatch(RoleSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addNewRole'));
			ToastSuccess('Successfully Save New Role!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RoleError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getRolesByUserId = (userId) => async (dispatch, getState) => {
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	await apiURL.get(`/user/${userId}`, {
			headers: {
				Accept: 'application/json',
				Authorization: token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(RoleGetAllByUserId(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RoleError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const applyRoleAuth = (selectedRole, target) => async (dispatch, getState) => {
	dispatch(RoleLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL.put(
			`/applyauthorities/${selectedRole}`,
			{ authorities: target },
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
			dispatch(RoleApplyAuthorities(data));
			dispatch(hideLoading('LOADINGBAR'));
			ToastSuccess('Successfully Save New Role!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(RoleError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};
