export const LOGIN_LOGIN = 'LOGIN_LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_LOADING= 'LOGIN_LOADING';
export const LOGIN_RESET = 'LOGIN_RESET';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

export const LoginReset = () => {
    return ( {
        type: LOGIN_RESET
    } );
} 

export const LoginLogout = () => {
    return ( {
        type: LOGIN_LOGOUT
    } );
} 

export const LoginLoading = () => {
    return ( {
        type: LOGIN_LOADING
    } );
} 

export const LoginLogin = data => {
    return ( {
        type: LOGIN_LOGIN, payload: data
    } );
} 

export const LoginError  = error => {
    return ( {
        type: LOGIN_ERROR, error: error
    } );
}

export const LOGIN_PROFILE_GET = 'LOGIN_PROFILE_GET';
export const LOGIN_PROFILE_ERROR = 'LOGIN_PROFILE_ERROR';
export const LOGIN_PROFILE_UPDATE = 'LOGIN_PROFILE_UPDATE';
export const LOGIN_PROFILE_LOADING = 'LOGIN_PROFILE_LOADING';
export const LOGIN_PROFILE_RESET= 'LOGIN_PROFILE_RESET';

export const LoginProfileReset = () => {
    return ( {
        type: LOGIN_PROFILE_RESET
    } );
}

export const LoginProfileLoading = () => {
    return ( {
        type: LOGIN_PROFILE_LOADING
    } );
}
 
export const LoginProfileGet = data => {
    return ( {
        type: LOGIN_PROFILE_GET, payload: data
    } );
}

export const LoginProfileUpdate = data => {
    return ( {
        type: LOGIN_PROFILE_UPDATE, payload: data
    } );
}

export const LoginProfileError  = error => {
    return ( {
        type: LOGIN_PROFILE_ERROR , error: error
    } );
}
 


 

