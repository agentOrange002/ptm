export const ROLE_ERROR = 'ROLE_ERROR';
export const ROLE_GET_BY_ROLEID = 'ROLE_GET_BY_ROLEID';
export const ROLE_GET_ALL = 'ROLE_GET_ALL';
export const ROLE_GET_BY_ID = 'ROLE_GET_BY_ID';
export const ROLE_SAVE = 'ROLE_SAVE';
export const ROLE_APPLY_AUTHORITIES = 'ROLE_APPLY_AUTHORITIES';
export const ROLE_DELETE = 'ROLE_DELETE';
export const ROLE_LOADING = 'ROLE_LOADING';
export const ROLE_RESET = 'ROLE_RESET';
export const ROLE_UPDATE = 'ROLE_UPDATE';
export const ROLE_CLEAR = 'ROLE_CLEAR';
export const ROLE_GET_ALL_BY_USERID = 'ROLE_GET_ALL_BY_USERID';

export const RoleLoading  = () => {
    return ( {
        type: ROLE_LOADING
    } );
}

export const RoleClear  = () => {
    return ( {
        type: ROLE_CLEAR
    } );
}

export const RoleReset  = () => {
    return ( {
        type: ROLE_RESET
    } );
}

export const RoleError  = error => {
    return ( {
        type: ROLE_ERROR, error:error
    } );
}

export const RoleGetAll = data => {
    return ( {
        type: ROLE_GET_ALL, payload:data
    } );
}

export const RoleGetAllByUserId = data => {
    return ( {
        type: ROLE_GET_ALL_BY_USERID, payload:data
    } );
}


export const RoleGetByRoleID = data => {
    return ( {
        type: ROLE_GET_BY_ROLEID, payload:data
    } );
}

export const RoleGetByID  = data => {
    return ( {
        type: ROLE_GET_BY_ID, payload:data
    } );
}

export const RoleSave  = data => {
    return ( {
        type: ROLE_SAVE, payload:data
    } );
}

export const RoleUpdate  = data => {
    return ( {
        type: ROLE_UPDATE, payload:data
    } );
}

export const RoleApplyAuthorities  = data => {
    return ( {
        type: ROLE_APPLY_AUTHORITIES, payload:data
    } );
}

export const RoleDelete  = data => {
    return ( {
        type: ROLE_DELETE, payload:data
    } );
}

