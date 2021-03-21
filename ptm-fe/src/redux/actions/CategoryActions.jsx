import { categoryURL as apiURL } from '../config/ConfigURL';
import {
	CategoryError,
	CategorySave,
	CategoryLoading,
	CategoryReset,
	CategoryGetAll,
	CategoryGetByCategoryID,	
} from '../constants/CategoryConstants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastInfo, ToastSuccess, ToastError } from '../../components/toasts';
import { reset } from 'redux-form';
import _ from 'lodash';

export const getAllCategories = () => async (dispatch, getState) => {
	dispatch(showLoading('LOADINGBAR'));
	dispatch(CategoryReset());
	dispatch(CategoryLoading());
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
			dispatch(CategoryGetAll(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;
			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(CategoryError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const getCategoryByCategoryId = categoryId => async (dispatch, getState) => {
	dispatch(CategoryLoading());
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.get(`/${categoryId}`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(CategoryGetByCategoryID(data));
			dispatch(hideLoading('LOADINGBAR'));			
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(CategoryError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const saveCategory = formValues => async (dispatch, getState) => {	
	dispatch(CategoryLoading());
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
			dispatch(CategorySave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('addNewCategory'));
			ToastSuccess('Successfully Save New Category!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(CategoryError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

