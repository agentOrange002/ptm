export const MEMBER_ERROR = 'MEMBER_ERROR';
export const MEMBER_GET_ALL_BY_TEAMID = 'MEMBER_GET_ALL_BY_TEAMID';
export const MEMBER_GET_ALL = 'MEMBER_GET_ALL';
export const MEMBER_GET_BY_ID = 'MEMBER_GET_BY_ID';
export const MEMBER_SAVE = 'MEMBER_SAVE';
export const MEMBER_UPDATE = 'MEMBER_UPDATE';
export const MEMBER_DELETE = 'MEMBER_DELETE';
export const MEMBER_LOADING = 'MEMBER_LOADING';
export const MEMBER_RESET = 'MEMBER_RESET';

export const MemberLoading  = () => {
    return ( {
        type: MEMBER_LOADING
    } );
}

export const MemberReset  = () => {
    return ( {
        type: MEMBER_RESET
    } );
}

export const MemberError  = error => {
    return ( {
        type: MEMBER_ERROR, error:error
    } );
}

export const MemberGetAll = data => {
    return ( {
        type: MEMBER_GET_ALL, payload:data
    } );
}

export const MemberGetAllByTeamID = data => {
    return ( {
        type: MEMBER_GET_ALL_BY_TEAMID, payload:data
    } );
}

export const MemberGetByID  = data => {
    return ( {
        type: MEMBER_GET_BY_ID, payload:data
    } );
}

export const MemberSave  = data => {
    return ( {
        type: MEMBER_SAVE, payload:data
    } );
}

export const MemberUpdate  = data => {
    return ( {
        type: MEMBER_UPDATE, payload:data
    } );
}

export const MemberDelete  = data => {
    return ( {
        type: MEMBER_DELETE, payload:data
    } );
}

