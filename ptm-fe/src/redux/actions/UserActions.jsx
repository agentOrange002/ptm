import {userURL as apiURL,userimageURL as userimages_apiURL } from '../config/ConfigURL';
import {
    UserError,
    UserGetByID,
    UserGetAll,
    UserLoading,
    UserImageSubmit,
    UserImageError,
    UserImageLoading,
    UserImageUpdate,
    UserSave,
    UserApplyRole,
    UserResetPassword
} from '../constants/UsersConstants';
import {showLoading,hideLoading} from 'react-redux-loading-bar';
import { ToastError, ToastSuccess,ToastInfo } from '../../components/toasts';
import _ from 'lodash';
import { reset } from 'redux-form';

export const getUserByID = (id) => async (dispatch, getState) => {
    dispatch(UserLoading());
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    await apiURL.get(`/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;          
            dispatch(UserGetByID(data));
        })
        .catch(function (error) {
            let errorResponse = error;                 
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;               
            }
            dispatch(UserError(errorResponse));
        })
};

export const getAllUsers = () => async (dispatch, getState) => {
    dispatch(UserLoading());
    dispatch(showLoading('LOADINGBAR'));
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    await apiURL.get('/all', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
           
            dispatch(UserGetAll(data));            
            dispatch(hideLoading('LOADINGBAR'));
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;             
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(UserError(errorResponse));
            ToastError(errorMessage);
            dispatch(hideLoading('LOADINGBAR'));
        })
};

export const submitUserImage = (param) => async (dispatch,getState) => {
    dispatch(UserImageLoading()); 
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    let userid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    dispatch(showLoading('LOADINGBAR'));
    await userimages_apiURL.post(`/${userid}`, param, {
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(UserImageSubmit(data));
            dispatch(hideLoading('LOADINGBAR'));
        })
        .catch(function (error) {
            let errorResponse = error;       
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
            }
            dispatch(UserImageError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
        })
};

export const updateUserImage = (param) => async (dispatch,getState) => {
    dispatch(UserImageLoading()); 
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    let userid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    dispatch(showLoading('LOADINGBAR'));
    await userimages_apiURL.put(`/${userid}`, param, {
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(UserImageUpdate(data));
            dispatch(hideLoading('LOADINGBAR'));
        })
        .catch(function (error) {
            let errorResponse = error;    
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
            }
            dispatch(UserImageError(errorResponse));
            dispatch(hideLoading('LOADINGBAR'));
        })
};

export const createUser = formValues => async (dispatch, getState) => {
  
    let newFormValues = null;
	if(_.isEmpty(formValues.suffixName)){
		newFormValues = {...formValues,"suffixName":""};
	}
	else {
		newFormValues = {...formValues};
	}

	dispatch(UserLoading());	
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
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
			dispatch(UserSave(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('userregistrationForm'));
			ToastSuccess('Successfully Create User!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(UserError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const applyUserRole = (formValues,userId) => async (dispatch, getState) => {

    //console.log(" APPLY USER ROLE:"+JSON.stringify(formValues));
    dispatch(UserLoading());	
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.put(`/applyrole/${userId}`, formValues, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(UserApplyRole(data));
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('applyUserRoleForm'));
			ToastSuccess('Successfully Apply User Role!');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(UserError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};

export const resetPassword = (formValues) => async (dispatch, getState) => {

    //console.log(" APPLY USER ROLE:"+JSON.stringify(formValues));
    dispatch(UserLoading());	
    let userId = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
	let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
	dispatch(showLoading('LOADINGBAR'));
	await apiURL
		.post(`/resetpassword/${userId}`, formValues, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': token,
			},
		})
		.then(function (response) {
			let data = response.data;
			dispatch(UserResetPassword());
			dispatch(hideLoading('LOADINGBAR'));
			dispatch(reset('resetpasswordForm'));
			ToastSuccess('Successfully Change Password');
		})
		.catch(function (error) {
			let errorResponse = error;
			let errorMessage = error.message;

			if (!_.isEmpty(error.response)) {
				errorResponse = error.response.data;
				errorMessage = error.response.data.message;
			}
			dispatch(UserError(errorResponse));
			dispatch(hideLoading('LOADINGBAR'));
			ToastError(errorMessage);
		});
};
