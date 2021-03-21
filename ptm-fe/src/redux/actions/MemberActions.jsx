import { memberURL as apiURL } from '../config/ConfigURL';
import {
	MemberError,
	MemberSave,
	MemberLoading,
	MemberUpdate,
	//MemberReset,
	MemberGetAll,
	//MemberGetAllByTeamID,
	MemberGetByID
} from '../constants/MemberConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastInfo, ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const getAllMembers = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(MemberLoading());
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
			dispatch(MemberGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getAllMembersByTeamId = teamId => async (dispatch, getState) => {
	dispatch(MemberLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/all/team/${teamId}`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(MemberGetAllByTeamId(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getMemberByMemberId = memberId => async (dispatch, getState) => {
	dispatch(MemberLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/${memberId}`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(MemberGetByID(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveMember = formValues => async (dispatch, getState) => {	
	dispatch(MemberLoading());
	let uid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	let newFormValues = null;
	if(_.isEmpty(formValues.suffixName)){
		newFormValues = {...formValues,"suffixName":"","loggedBy":uid};
	}
	else {
		newFormValues = {...formValues,"loggedBy":uid};
	}

	await apiURL
		.post('/', newFormValues, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(MemberSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addNewMember'));
			ToastSuccess('Successfully Save New Member.');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const updateMember = (memberId,profile) => async (dispatch, getState) => {	
	dispatch(MemberLoading());	
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	
	let newFormValues = null;
	if(_.isEmpty(profile.suffixName)){
		newFormValues = {...profile,"suffixName":""};
	}
	else {
		newFormValues = {...profile};
	}
	await apiURL
		.put(`/${memberId}`, newFormValues, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(MemberUpdate(data));
			dispatch(hideLoading('LOADINGBAR'));			
			ToastSuccess('Successfully Update Member!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};


