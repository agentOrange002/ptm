import {addressURL as apiURL} from '../config/ConfigURL';
import {
  AddressError,
  AddressSave, 
} from '../constants/AddressConstants';
import { reset } from 'redux-form';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {ToastError,ToastSuccess} from '../../components/toasts';
import _ from 'lodash';

export const saveAddress = (formValues) => async (dispatch, getState) => {    
    let id = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.userid;
    let token = getState().LOGIN_AUTHENTICATION.loginState.loginResponse.authorization;   
    dispatch(showLoading('LOADINGBAR'));
    await apiURL.post(`/${id}`, formValues,{
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',           
            'Authorization': token
        }
    })
        .then(function (response) {
            let data = response.data;
            dispatch(AddressSave(data));    
            dispatch(reset('addAddressForm'));
            dispatch(hideLoading('LOADINGBAR'));
            ToastSuccess('Successfully Save New Address!');
        })
        .catch(function (error) {
            let errorResponse = error;
            let errorMessage = error.message;             
            if(!_.isEmpty(error.response)){
                errorResponse = error.response.data;
                errorMessage = error.response.data.message;
            }
            dispatch(AddressError(errorResponse));    
            dispatch(hideLoading('LOADINGBAR'));
            ToastError(errorMessage);
        })
};



