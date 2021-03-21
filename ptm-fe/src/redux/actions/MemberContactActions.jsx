import { membercontactURL as apiURL } from '../config/ConfigURL';
import {
	MemberContactError,
	MemberContactSave,
	MemberContactLoading,
	MemberContactReset,
	MemberContactGetAll,
	MemberContactGetByContactID,	
	MemberContactGetAllByMemberId,
	MemberContactClear,
} from '../constants/MemberContactConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastInfo, ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const mcClear = () => async dispatch => {
	await dispatch(MemberContactClear());
};

export const mcReset = () => async dispatch => {
	await dispatch(MemberContactReset());
};

export const getAllMemberContact = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(MemberContactReset());
	dispatch(MemberContactLoading());
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
			dispatch(MemberContactGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberContactError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getAllMemberContactByMemberId = memberId => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(MemberContactReset());
	dispatch(MemberContactLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	await apiURL
		.get(`/member/${memberId}`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(MemberContactGetAllByMemberId(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberContactError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getMemberContactByContactId = contactId => async (dispatch, getState) => {
	dispatch(MemberContactLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/${contactId}`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(MemberContactGetByContactID(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberContactError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveMemberContact = (formValues,memberId) => async (dispatch, getState) => {

	dispatch(MemberContactLoading());
	let uid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.post(`/${memberId}`, formValues, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(MemberContactSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addMemberContactForm'));
			ToastSuccess('Successfully Save New MemberContact!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberContactError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

