import {authorityURL as apiURL} from '../config/ConfigURL';
import {
    AuthorityError,
    AuthorityGetAll,  
    AuthorityLoading,
    AuthoritiesSystemUserID,
    AuthorityGetAllByRole
} from '../constants/AuthorityConstants';
import _ from 'lodash';

export const systemAuthoritiesUser = () => async (dispatch, getState) => {
    let id = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(AuthorityLoading());   
    await apiURL.get(`/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(AuthoritiesSystemUserID(data));    
        })
        .catch(function (error) {
            let errorResponse = error;
           // let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                //errorMessage = error.response.data.message;
            }
            dispatch(AuthorityError(errorResponse));    
        })
};

export const getAllAuthorities = () => async (dispatch, getState) => {
  
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(AuthorityLoading());   
    await apiURL.get(`/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(AuthorityGetAll(data));    
        })
        .catch(function (error) {
            let errorResponse = error;
           // let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
            
                errorResponse = error.response.data;
                //errorMessage = error.response.data.message;
            }
            dispatch(AuthorityError(errorResponse));    
        })
};

export const getAuthoritiesByRole = roleName => async (dispatch, getState) => {
  
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;
    dispatch(AuthorityLoading());   
    await apiURL.get(`/byrole/${roleName}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(AuthorityGetAllByRole(data));    
        })
        .catch(function (error) {
            let errorResponse = error;
           // let errorMessage = error.message;    
         
            if(!_.isEmpty(error.response)){
            
                errorResponse = error.response.data;
                //errorMessage = error.response.data.message;
            }
            dispatch(AuthorityError(errorResponse));    
        })
};



