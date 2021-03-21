export const USER_SAVE = 'USER_SAVE';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_DELETE = 'USER_DELETE';
export const USER_GET_ALL= 'USER_GET_ALL';
export const USER_GET_BY_ID= 'USER_GET_BY_ID';
export const USER_ERROR = 'USER_ERROR';
export const USER_LOADING = 'USER_LOADING';
export const USER_RESET = 'USER_RESET';
export const USER_APPLY_ROLE = 'USER_APPLY_ROLE';
export const USER_RESETPASSWORD = 'USER_RESETPASSWORD';

export const UserLoading = () => {
    return ( {
        type: USER_LOADING
    } );
} 

export const UserResetPassword= () => {
    return ( {
        type: USER_RESETPASSWORD
    } );
} 

export const UserReset= () => {
    return ( {
        type: USER_RESET
    } );
} 

export const UserSave = data => {
    return ( {
        type: USER_SAVE, payload:data
    } );
} 

export const UserUpdate = data => {
    return ( {
        type: USER_UPDATE, payload:data
    } );
} 

export const UserApplyRole = data => {
    return ( {
        type: USER_APPLY_ROLE, payload:data
    } );
} 

export const UserDelete = data => {
    return ( {
        type: USER_DELETE, payload:data
    } );
} 

export const UserGetAll = data => {
    return ( {
        type: USER_GET_ALL, payload:data
    } );
} 

export const UserGetByID = data => {
    return ( {
        type: USER_GET_BY_ID, payload:data
    } );
} 

export const UserError = error => {
    return ( {
        type: USER_ERROR, error:error
    } );
}


export const USER_IMAGE_SUBMIT = 'USER_IMAGE_SUBMIT';
export const USER_IMAGE_GET = 'USER_IMAGE_GET';
export const USER_IMAGE_UPDATE = 'USER_IMAGE_UPDATE';
export const USER_IMAGE_ERROR = 'USER_IMAGE_ERROR';
export const USER_IMAGE_LOADING = 'USER_IMAGE_LOADING';
export const USER_IMAGE_RESET = 'USER_IMAGE_RESET';

export const UserImageLoading = () => {
    return ({
        type: USER_IMAGE_LOADING
    });
}

export const UserImageReset = () => {
    return ({
        type: USER_IMAGE_RESET
    });
}

export const UserImageSubmit = data => {
    return ({
        type: USER_IMAGE_SUBMIT, payload: data
    });
}

export const UserImageUpdate = data => {
    return ({
        type: USER_IMAGE_UPDATE, payload: data
    });
}

export const UserImageGet = data => {
    return ({
        type: USER_IMAGE_GET, payload: data
    });
}

export const UserImageError = error => {
    return ({
        type: USER_IMAGE_ERROR, error: error
    });
}