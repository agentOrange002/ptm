import { memberaddressURL as apiURL } from '../config/ConfigURL';
import {
	MemberAddressError,
	MemberAddressSave,
	MemberAddressLoading,
	MemberAddressReset,
	MemberAddressGetAll,
	MemberAddressGetByAddressID,	
	MemberAddressClear,
	MemberAddressGetAllByMemberId,
} from '../constants/MemberAddressConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastInfo, ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const memberAddressClear = () => async dispatch => {
	await dispatch(MemberAddressClear());
};

export const maReset = () => async dispatch => {
	await dispatch(MemberAddressReset());
};

export const getAllMemberAddressByMemberId = memberId => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(MemberAddressReset());
	dispatch(MemberAddressLoading());
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
			dispatch(MemberAddressGetAllByMemberId(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberAddressError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getAllMemberAddress = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(MemberAddressReset());
	dispatch(MemberAddressLoading());
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
			dispatch(MemberAddressGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberAddressError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getMemberAddressByAddressId = addressId => async (dispatch, getState) => {
	dispatch(MemberAddressLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/${addressId}`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(MemberAddressGetByAddressID(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberAddressError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveMemberAddress = (formValues,memberId) => async (dispatch, getState) => {
	dispatch(MemberAddressLoading());
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
			dispatch(MemberAddressSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addMemberAddressForm'));
			ToastSuccess('Successfully Save New MemberAddress!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(MemberAddressError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

