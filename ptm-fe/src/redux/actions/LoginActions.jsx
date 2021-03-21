import {loginURL as url, userURL as urlProfile } from '../config/ConfigURL';
import {
  LoginLogin,
  LoginError,
  LoginLoading,
  LoginProfileGet,
  LoginProfileError,
  LoginProfileUpdate,
  LoginProfileLoading,  
} from "../constants/LoginConstants";
import history from "../../routes/history";
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ToastSuccess,ToastError, ToastInfo,ToastDark} from '../../components/toasts';
import _ from 'lodash';


export const Logout = () => async dispatch => {
  await dispatch(LoginLogout());
};

export const LoginAuthentication = (formValues) => async dispatch => {
  dispatch(LoginLoading());
  dispatch(showLoading('loginBar'));
  await url.post("/login", formValues)
    .then(function (response) {
      let data = response.headers;
      dispatch(LoginLogin(data));
      dispatch(hideLoading('loginBar'));
      ToastDark('Welcome to Payout Team Management!');
      history.push("/app/");
    })
    .catch(function (error) {
      let errorResponse = error;   
   
      if(!_.isEmpty(error.response)){
          errorResponse = error.response.data;
         
      }
      dispatch(LoginError(errorResponse));
      dispatch(hideLoading('loginBar'));
    });
 
};

export const LoginProfile = () => async (dispatch, getState) => { 
  dispatch(LoginProfileLoading());
  let userid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
  let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization; 
  await urlProfile.get(`/${userid}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(function (response) {
      let data = response.data;
      dispatch(LoginProfileGet(data));      
    })
    .catch(function (error) {
      let errorResponse = error;   
      if(!_.isEmpty(error.response)){
          errorResponse = error.response.data;
         
      }
      dispatch(LoginProfileError(errorResponse));
    });
};

export const ProfileUpdate = (values) => async (dispatch, getState) => { 
  dispatch(LoginProfileLoading());
  dispatch(showLoading('LOADINGBAR'));
  let userid = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
  let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
  await urlProfile.put(`/${userid}`, values, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(function (response) {
      let data = response.data;
      dispatch(LoginProfileUpdate(data));
      dispatch(hideLoading('LOADINGBAR'));
      ToastSuccess('Successfully update the profile');
    })
    .catch(function (error) {
      let errorResponse = error;
      let errorMessage = error.message;    
   
      if(!_.isEmpty(error.response)){
          errorResponse = error.response.data;
          errorMessage = error.response.data.message;
      }
      dispatch(LoginProfileError(errorResponse));
      dispatch(hideLoading('LOADINGBAR'));
      ToastError(errorMessage);
    });
};
